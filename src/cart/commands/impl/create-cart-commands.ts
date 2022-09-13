export class CreateCartCommands {
  constructor(
    public readonly productId: number,
    public readonly quantity: number,
    public readonly name: string,
  ) {}
}
