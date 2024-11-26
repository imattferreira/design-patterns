import HttpClient from "./http-client";

export interface ProductDTO {
  productId: number;
  description: string;
  price: number;
}

export default interface CatalogGateway {
  getProduct(productId: number): Promise<ProductDTO>;
}

export class CatalogGatewayHttp implements CatalogGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async getProduct(productId: number): Promise<ProductDTO> {
    return this.httpClient.get<ProductDTO>(
      `http://localhost:3001/products/${productId}`
    );
  }
}
