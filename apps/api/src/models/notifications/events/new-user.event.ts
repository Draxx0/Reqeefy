export class NewUserEvent {
  constructor(
    public firstName: string,
    public lastName: string,
    public userId: string,
  ) {}
}
