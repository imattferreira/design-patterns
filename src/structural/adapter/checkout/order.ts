import { ProductDTO } from "./catalog-gateway";
import Item from "./item";

class Order {
  items: Item[];

  constructor() {
    this.items = [];
  }

  addProduct(product: ProductDTO, quantity: number) {
    this.items.push(new Item(product.productId, product.price, quantity));
  }

  getTotal(): number {
    return this.items.reduce((prev, curr) => (prev += curr.getTotal()), 0);
  }
}

export default Order;
