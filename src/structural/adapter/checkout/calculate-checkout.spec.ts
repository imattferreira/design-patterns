import { describe, expect, it } from "vitest";
import { CatalogGatewayHttp } from "./catalog-gateway";
import CalculateCheckout from "./calculate-checkout";
import { AxiosAdapter } from "./http-client";

describe.skip("CalculateCheckout", () => {
  it("should calculate the checkout", async () => {
    const input = {
      items: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 2,
        },
        {
          productId: 3,
          quantity: 3,
        },
      ],
    };

    const axiosAdapter = new AxiosAdapter();
    const catalogGateway = new CatalogGatewayHttp(axiosAdapter);
    const calculateCheckout = new CalculateCheckout(catalogGateway);
    const output = await calculateCheckout.execute(input);

    expect(output.total).toBe(1400);
  });
});
