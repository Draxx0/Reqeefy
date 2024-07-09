import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType } from '@reqeefy/types';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { MessageEntity } from '../messages/entities/message.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { UserEntity } from '../users/entities/user.entity';
import { NotificationEntity } from './entities/notification.entity';
import { NewMessageEvent } from './events/new-message.event';
import { NewTicketEvent } from './events/new-ticket.event';
import { NewUserEvent } from './events/new-user.event';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) {}

  @OnEvent('new.user')
  async newUser({
    first_name,
    last_name,
    email,
    accountActivationToken,
    userId,
  }: NewUserEvent) {
    // this.mailService.sendUserConfirmation({
    //   user: { first_name, last_name, email },
    //   token: accountActivationToken,
    // });
    return await this.create({
      userId,
      type: 'welcome',
      message: `Bienvenue sur reqeefy ${first_name} ${last_name} !`,
    });
  }

  @OnEvent('new.message')
  async newMessage({ messageOwnerId, ticketId }: NewMessageEvent) {
    const message = await this.messageRepository.findOne({
      where: { user: { id: messageOwnerId } },
      relations: ['user'],
    });

    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: [
        'customers',
        'support_agents',
        'customers.user',
        'support_agents.user',
      ],
    });

    const ticketUsers = [
      ...ticket.customers.map((customer) => ({
        id: customer.user.id,
      })),
      ...ticket.support_agents.map((supportAgent) => ({
        id: supportAgent.user.id,
      })),
    ];

    const ticketUsersWithoutOwner = ticketUsers.filter(
      (user) => user.id !== messageOwnerId,
    );

    const messageOwner = `${message.user.last_name + ' ' + message.user.first_name}`;

    return await Promise.all(
      ticketUsersWithoutOwner.map((user) =>
        this.create({
          userId: user.id,
          type: 'new_message',
          link: `/tickets/${ticketId}`,
          message: `${messageOwner}  a envoyé un message sur le ticket ${ticket.title} !`,
        }),
      ),
    );
  }

  @OnEvent('new.ticket_to_distribute')
  async newTicketToDistribute({ ticketId, ticketOwnerId }: NewTicketEvent) {
    const distributors = await this.userRepository.find({
      where: [{ role: 'distributor' }, { role: 'superadmin' }],
    });

    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['project'],
    });

    const ticketOwner = await this.userRepository.findOne({
      where: { id: ticketOwnerId },
    });

    const ticketOwnerName = `${ticketOwner.last_name + ' ' + ticketOwner.first_name}`;

    return await Promise.all(
      distributors.map(async (distributor) => {
        // this.mailService.sendTicketToDistribute({
        //   supportAgent: {
        //     first_name: distributor.first_name,
        //     email: distributor.email,
        //   },
        //   ticketOwnerName,
        //   ticket,
        //   link: `http://localhost:3000/tickets/${ticketId}`,
        // });

        await this.create({
          userId: distributor.id,
          type: 'new_ticket_to_distribute',
          link: `/distributions`,
          message: `Nouvelle discussion à distribuer ! ${ticketOwnerName} a créé une nouvelle discussion sur le projet ${ticket.project.name} !`,
        });
      }),
    );
  }

  @OnEvent('new.ticket')
  async newTicket({ ticketId, ticketOwnerId }: NewTicketEvent) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: [
        'customers',
        'support_agents',
        'support_agents.user',
        'project',
      ],
    });

    const ticketUsers = ticket.support_agents.map((supportAgent) => ({
      id: supportAgent.user.id,
      first_name: supportAgent.user.first_name,
      email: supportAgent.user.email,
    }));

    const ticketOwner = await this.userRepository.findOne({
      where: { id: ticketOwnerId },
    });

    const ticketOwnerName = `${ticketOwner.last_name + ' ' + ticketOwner.first_name}`;

    return await Promise.all(
      ticketUsers.map(async (user) => {
        this.mailService.sendTicketAssigned({
          supportAgent: {
            first_name: user.first_name,
            email: user.email,
          },
          ticketOwnerName,
          ticket,
          link: `http://localhost:3000/tickets/${ticketId}`,
        });

        await this.create({
          userId: user.id,
          type: 'new_ticket',
          link: `/tickets/${ticketId}`,
          message: `Vous avez était assigné ! Une nouvelle discussion a été crée par ${ticketOwnerName} sur le projet ${ticket.project.name} !`,
        });
      }),
    );
  }

  // NOTIFICATION SERVICES -->

  private async create({
    userId,
    type,
    message,
    link,
  }: {
    userId: string;
    type: NotificationType;
    message: string;
    link?: string;
  }) {
    const notification = this.notificationRepository.create({
      type,
      message,
      link,
      user: { id: userId },
    });

    return await this.notificationRepository.save(notification);
  }

  async read(id: string) {
    return await this.notificationRepository.update(id, { read: true });
  }

  async readAllUserNotifications(userId: string) {
    return await this.notificationRepository.update(
      { user: { id: userId } },
      { read: true },
    );
  }

  async delete(id: string) {
    return await this.notificationRepository.delete(id);
  }

  async deleteAllUserNotifications(userId: string) {
    return await this.notificationRepository.delete({ user: { id: userId } });
  }
}
