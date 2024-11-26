import GetProduct from "./get-product";
import { ProductsRepositoryInMemory } from "./products-repository";
import { HapiAdapter } from "./http-server";

// const httpServer = new ExpressAdapter();
const httpServer = new HapiAdapter();

httpServer.register("get", "/products/:{productId}", async (params: any) => {
  const productId = parseInt(params.productId);
  const productsRepository = new ProductsRepositoryInMemory();
  const getProduct = new GetProduct(productsRepository);

  return getProduct.execute(productId);
});

httpServer.listen(3001);
