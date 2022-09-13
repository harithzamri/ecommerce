export class CreateSessionCommand {
  constructor(
    public readonly orderId: number,
    public readonly userId: number,
  ) {}
}
