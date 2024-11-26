import axios from "axios";
import { describe, expect, it } from "vitest";

describe.skip("catalog", () => {
  it("should consult a product of catalog", async () => {
    const response = await axios.get("http://localhost:3001/products/1");
    const output = response.data;

    expect(output.productId).toBe(1);
    expect(output.description).toBe("A");
    expect(output.price).toBe(100);
  });
});
