class Item {
  constructor(
    readonly productId: number,
    readonly price: number,
    readonly quantity: number
  ) {}

  getTotal(): number {
    return this.price * this.quantity;
  }
}

export default Item;
