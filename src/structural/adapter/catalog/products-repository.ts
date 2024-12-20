import Product from "./product";

export default interface ProductsRepository {
  getById(productId: number): Promise<Product>;
}

export class ProductsRepositoryInMemory implements ProductsRepository {
  private products: Product[];

  constructor() {
    this.products = [
      {
        productId: 1,
        description: "A",
        price: 100,
      },
      {
        productId: 2,
        description: "B",
        price: 200,
      },
      {
        productId: 3,
        description: "C",
        price: 300,
      },
    ];
  }

  async getById(productId: number): Promise<Product> {
    const product = this.products.find(
      (product) => product.productId === productId
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
