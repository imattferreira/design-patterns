import { describe, expect, it } from "vitest";
import Passenger from "./passenger";
import Driver from "./driver";

describe("Account", () => {
  it("should create a passenger user account", () => {
    const account = new Passenger(
      "John Doe",
      "john@doe.com",
      "12345678912",
      "JOHN DOE",
      "1111 1111 1111 1111",
      "08/28",
      "123",
      "123456"
    );

    expect(account.name).toBe("John Doe");
    expect(account.email).toBe("john@doe.com");
  });

  it("should validate the stored password as plain-text of a passenger user account", () => {
    const account = new Passenger(
      "John Doe",
      "john@doe.com",
      "12345678912",
      "JOHN DOE",
      "1111 1111 1111 1111",
      "08/28",
      "123",
      "123456",
      "plaintext"
    );

    expect(account.passwordMatches("123456")).toBe(true);
  });

  it("should validate the stored password as SHA-1 of a passenger user account", () => {
    const account = new Passenger(
      "John Doe",
      "john@doe.com",
      "12345678912",
      "JOHN DOE",
      "1111 1111 1111 1111",
      "08/28",
      "123",
      "123456",
      "sha-1"
    );

    expect(account.passwordMatches("123456")).toBe(true);
  });

  it("should create a driver user account", () => {
    const account = new Driver(
      "John Doe",
      "john@doe.com",
      "12345678912",
      "AAA1234",
      "123456"
    );

    expect(account.name).toBe("John Doe");
    expect(account.email).toBe("john@doe.com");
  });

  it("should not create a passenger user account with a invalid name", () => {
    expect(
      () =>
        new Passenger(
          "John",
          "john@doe.com",
          "12345678912",
          "JOHN DOE",
          "1111 1111 1111 1111",
          "08/28",
          "123",
          "123456"
        )
    ).toThrow(new Error("Invalid name"));
  });

  it("should not create a passenger user account with a invalid email", () => {
    expect(
      () =>
        new Passenger(
          "John Doe",
          "john@doe",
          "12345678912",
          "JOHN DOE",
          "1111 1111 1111 1111",
          "08/28",
          "123",
          "123456"
        )
    ).toThrow(new Error("Invalid email"));
  });

  it("should not create a passenger user account with a invalid document", () => {
    expect(
      () =>
        new Passenger(
          "John Doe",
          "john@doe.com",
          "123",
          "JOHN DOE",
          "1111 1111 1111 1111",
          "08/28",
          "123",
          "123456"
        )
    ).toThrow(new Error("Invalid document"));
  });

  it("should not create a driver user account with a invalid car plate", () => {
    expect(
      () =>
        new Driver(
          "John Doe",
          "john@doe.com",
          "12345678912",
          "AAA123",
          "123456"
        )
    ).toThrow(new Error("Invalid car plate"));
  });

  it("should not create a passenger user account with a invalid CVV", () => {
    expect(
      () =>
        new Passenger(
          "John Doe",
          "john@doe.com",
          "12345678912",
          "JOHN DOE",
          "1111 1111 1111 1111",
          "08/28",
          "1",
          "123456"
        )
    ).toThrow(new Error("Invalid cvv"));
  });
});
