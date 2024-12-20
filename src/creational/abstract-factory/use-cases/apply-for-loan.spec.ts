import { describe, expect, it } from "vitest";
import ApplyForLoan from "./apply-for-loan";
import GetLoan from "./get-loan";
import { RepositoriesInMemoryFactory } from "../factories/repositories-factory";
import { MortgageLoanFactory } from "../factories/loans-factory";

describe("ApplyForLoan", () => {
  it("should request a mortgage loan", async () => {
    const loanFactory = new MortgageLoanFactory();
    const repositoryInMemoryFactory = new RepositoriesInMemoryFactory();
    const applyForLoan = new ApplyForLoan(
      repositoryInMemoryFactory,
      loanFactory
    );
    const input = {
      amount: 100_000,
      income: 10_000,
      installments: 240,
    };

    const outputApplyForLoan = await applyForLoan.execute(input);

    const getLoan = new GetLoan(repositoryInMemoryFactory);

    const outputGetLoan = await getLoan.execute(outputApplyForLoan);

    expect(outputGetLoan.amount).toBe(100_000);
    expect(outputGetLoan.income).toBe(10_000);

    expect(outputGetLoan.installments).toHaveLength(240);
    expect(outputGetLoan.installments.at(0)?.number).toBe(1);
    expect(outputGetLoan.installments.at(0)?.amount).toBe(1250);
    expect(outputGetLoan.installments.at(0)?.amortization).toBe(416.67);
    expect(outputGetLoan.installments.at(0)?.interest).toBe(833.33);
    expect(outputGetLoan.installments.at(0)?.balance).toBe(99583.33);

    expect(outputGetLoan.installments.at(239)?.number).toBe(240);
    expect(outputGetLoan.installments.at(239)?.amount).toBe(420.14);
    expect(outputGetLoan.installments.at(239)?.amortization).toBe(416.67);
    expect(outputGetLoan.installments.at(239)?.interest).toBe(3.47);
    expect(outputGetLoan.installments.at(239)?.balance).toBe(0);
  });
});
