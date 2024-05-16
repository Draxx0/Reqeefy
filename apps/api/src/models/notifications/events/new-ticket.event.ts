export class NewTicketEvent {
  constructor(
    public ticketOwnerId: string,
    public ticketId: string,
  ) {}
}
