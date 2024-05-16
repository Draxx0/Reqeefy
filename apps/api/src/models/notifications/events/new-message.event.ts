export class NewMessageEvent {
  constructor(
    public messageOwnerId: string,
    public ticketId: string,
  ) {}
}
