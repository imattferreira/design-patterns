import CatalogGateway from "./catalog-gateway";
import Order from "./order";

interface Input {
  items: { productId: number; quantity: number }[];
}

interface Output {
  total: number;
}

class CalculateCheckout {
  constructor(private readonly catalogGateway: CatalogGateway) {}

  async execute(input: Input): Promise<Output> {
    const order = new Order();

    for (const item of input.items) {
      const product = await this.catalogGateway.getProduct(item.productId);

      order.addProduct(product, item.quantity);
    }

    const total = order.getTotal();

    return { total };
  }
}

export default CalculateCheckout;
