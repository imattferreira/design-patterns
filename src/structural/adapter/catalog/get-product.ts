import ProductsRepository from "./products-repository";

interface Output {
  productId: number;
  description: string;
  price: number;
}

export default class GetProduct {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(productId: number): Promise<Output> {
    const product = await this.productsRepository.getById(productId);

    return {
      productId: product.productId,
      description: product.description,
      price: product.price,
    };
  }
}
