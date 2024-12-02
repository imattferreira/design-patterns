import { describe, expect, it } from "vitest";
import BankAccount from "./bank-account";
import TransferCommand from "./transfer-command";

describe("BankAccount", () => {
  it("should be able create a transfer between two accounts", () => {
    const from = new BankAccount(1);
    const to = new BankAccount(2);

    expect(from.getBalance()).toBe(0);
    expect(to.getBalance()).toBe(0);

    from.debit(100);
    to.credit(100);

    expect(from.getBalance()).toBe(-100);
    expect(to.getBalance()).toBe(100);
  });

  it("should be able create a transfer between two accounts using a command", () => {
    const from = new BankAccount(1);
    const to = new BankAccount(2);

    expect(from.getBalance()).toBe(0);
    expect(to.getBalance()).toBe(0);

    const transferCommand = new TransferCommand(from, to, 100);

    transferCommand.execute();

    expect(from.getBalance()).toBe(-100);
    expect(to.getBalance()).toBe(100);
  });
});
