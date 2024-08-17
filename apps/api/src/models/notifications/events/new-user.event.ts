export class NewUserEvent {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public accountActivationToken: string,
    public userId: string,
  ) {}
}
