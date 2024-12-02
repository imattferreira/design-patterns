import { describe, expect, it } from "vitest";
import MakeTransfer from "./make-transfer";
import { BanksAccountsRepositoryInMemory } from "./banks-accounts-repository";
import GetBalance from "./get-balance";
import BankAccount from "./bank-account";

describe("MakeTransfer", () => {
  it("should be able to make a transfer", async () => {
    const banksAccountsRepository = new BanksAccountsRepositoryInMemory();
    const makeTransfer = new MakeTransfer(banksAccountsRepository);

    const input = {
      fromBankAccountId: 1,
      toBankAccountId: 2,
      amount: 100,
    };

    await banksAccountsRepository.save(new BankAccount(1));
    await banksAccountsRepository.save(new BankAccount(2));
    await makeTransfer.execute(input);

    const getBalance = new GetBalance(banksAccountsRepository);

    const outputA = await getBalance.execute(input.fromBankAccountId);
    const outputB = await getBalance.execute(input.toBankAccountId);

    expect(outputA.balance).toBe(-100);
    expect(outputB.balance).toBe(100);
  });
});
