import { Test, TestingModule } from '@nestjs/testing';
import { MessageEntity } from 'src/models/messages/entities/message.entity';
import { CreateMessageDto } from '../../messages/dto/create-message.dto';
import { MessagesService } from '../../messages/messages.service';
import { UsersService } from '../../users/users.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { DistributeTicketDTO } from '../dto/distribute-ticket.dto';
import { TicketQueries } from '../queries/queries';
import { TicketsController } from '../tickets.controller';
import { TicketsService } from '../tickets.service';

describe('TicketsController', () => {
  let controller: TicketsController;
  let ticketsService: TicketsService;
  let messagesService: MessagesService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAllDistributedByAgency: jest.fn().mockResolvedValue([]),
            findAllToDistributeByAgency: jest.fn().mockResolvedValue([]),
            findAllByProjects: jest.fn().mockResolvedValue([]),
            findOneById: jest.fn().mockResolvedValue({}),
            updateStatus: jest.fn().mockResolvedValue({}),
            archiveTicket: jest.fn().mockResolvedValue({}),
            distribute: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: MessagesService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    ticketsService = module.get<TicketsService>(TicketsService);
    messagesService = module.get<MessagesService>(MessagesService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        title: 'Test Ticket',
        content: 'Test Content',
      };
      const projectId = 'projectId';
      const userId = 'userId';
      const req = { user: { id: userId } } as any;

      ticketsService.create = jest
        .fn()
        .mockResolvedValue({ id: 'ticketId', ...createTicketDto });

      const result = await controller.create(createTicketDto, projectId, req);

      expect(ticketsService.create).toHaveBeenCalledWith(
        createTicketDto,
        projectId,
        userId,
      );

      expect(result).toBeDefined();
      expect(result.title).toBe(createTicketDto.title);

      // Teste le cas où la méthode create du service échoue
      const errorMessage = 'Erreur lors de la création du ticket';
      ticketsService.create = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.create(createTicketDto, projectId, req),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe('createMessage', () => {
    it('should create a message and return a Message entity', async () => {
      const createMessageDto: CreateMessageDto = {
        content: 'Test Message',
        uploadedFiles: [],
      };
      const ticketId = 'ticketId';
      const userId = 'userId';
      const req = { user: { id: userId } } as any;
      const mockMessage = new MessageEntity();
      mockMessage.id = 'messageId';
      mockMessage.content = createMessageDto.content;

      usersService.findOneById = jest.fn().mockResolvedValue({ id: userId });
      ticketsService.findOneById = jest
        .fn()
        .mockResolvedValue({ id: ticketId, distributed: true });
      ticketsService.updateStatus = jest.fn().mockResolvedValue({});
      messagesService.create = jest.fn().mockResolvedValue(mockMessage);

      const result = await controller.createMessage(
        createMessageDto,
        ticketId,
        req,
      );

      expect(usersService.findOneById).toHaveBeenCalledWith(userId);
      expect(ticketsService.findOneById).toHaveBeenCalledWith(ticketId);
      expect(ticketsService.updateStatus).toHaveBeenCalled();
      expect(messagesService.create).toHaveBeenCalledWith(
        createMessageDto,
        ticketId,
        userId,
      );
      expect(result).toBe(mockMessage);
    });

    it('should throw an error if the ticket is not distributed', async () => {
      const createMessageDto: CreateMessageDto = {
        content: 'Test Message',
        uploadedFiles: [],
      };
      const ticketId = 'ticketId';
      const userId = 'userId';
      const req = { user: { id: userId } } as any;

      ticketsService.findOneById = jest
        .fn()
        .mockResolvedValue({ id: ticketId, distributed: false });

      await expect(
        controller.createMessage(createMessageDto, ticketId, req),
      ).rejects.toThrow('Ticket not distributed, you can"t add a message');
    });
  });

  describe('findAllByAgency', () => {
    it('should find all distributed tickets by agency and return them', async () => {
      const agencyId = 'agencyId';
      const queries: TicketQueries = {};
      const userId = 'userId';
      const req = { user: { id: userId } } as any;

      const mockTickets = [
        { id: 'ticket1', title: 'Ticket 1', distributed: true },
        { id: 'ticket2', title: 'Ticket 2', distributed: true },
        { id: 'ticket3', title: 'Ticket 3', distributed: false },
      ];

      ticketsService.findAllDistributedByAgency = jest
        .fn()
        .mockResolvedValue(mockTickets.filter((ticket) => ticket.distributed));

      const result = await controller.findAllByAgency(agencyId, queries, req);

      expect(ticketsService.findAllDistributedByAgency).toHaveBeenCalledWith(
        queries,
        agencyId,
        userId,
      );

      expect(result).toEqual(
        mockTickets.filter((ticket) => ticket.distributed),
      );
    });
  });

  describe('findAllToDistribute', () => {
    it('should find all tickets to distribute by agency', async () => {
      const agencyId = 'agencyId';
      const queries: TicketQueries = {};

      await controller.findAllToDistribute(agencyId, queries);

      expect(ticketsService.findAllToDistributeByAgency).toHaveBeenCalledWith(
        queries,
        agencyId,
      );
    });
  });

  describe('findAllByProject', () => {
    it('should find all tickets by project', async () => {
      const projectId = 'projectId';
      const queries: TicketQueries = {};

      await controller.findAllByProject(projectId, queries);

      expect(ticketsService.findAllByProjects).toHaveBeenCalledWith(
        queries,
        projectId,
      );
    });
  });

  describe('findOneById', () => {
    it('should find one ticket by id', async () => {
      const ticketId = 'ticketId';

      await controller.findOneById(ticketId);

      expect(ticketsService.findOneById).toHaveBeenCalledWith(ticketId);
    });
  });

  describe('archiveTicket', () => {
    it('should archive a ticket', async () => {
      const ticketId = 'ticketId';

      await controller.archiveTicket(ticketId);

      expect(ticketsService.archiveTicket).toHaveBeenCalledWith(ticketId);
    });
  });

  describe('distribute', () => {
    it('should distribute a ticket', async () => {
      const ticketId = 'ticketId';
      const body: DistributeTicketDTO = { agent_groups_ids: [] };

      await controller.distribute(ticketId, body);

      expect(ticketsService.distribute).toHaveBeenCalledWith(ticketId, body);
    });
  });
});
