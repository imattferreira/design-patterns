import { describe, expect, it } from "vitest";
import { CarLoan, MortgageLoan } from "./loan";

describe("Loan", () => {
  it("should create a mortgage loan", () => {
    const loan = MortgageLoan.create(100_000, 10_000, 240);

    expect(loan.loanId).toBeDefined();
    expect(loan.amount).toBe(100_000);
    expect(loan.income).toBe(10_000);
    expect(loan.installments).toBe(240);
  });

  it("should not create a mortgage loan with installments bigger than 420 months", () => {
    expect(() => MortgageLoan.create(100_000, 10_000, 450)).toThrow(
      new Error("The maximum number of installments for mortgage loan is 420")
    );
  });

  it("should not create a mortgage loan when installment is bigger than 25% of mensal income", () => {
    expect(() => MortgageLoan.create(200_000, 1_000, 420)).toThrow(
      new Error("The installment amount could not exceed 25% of monthly income")
    );
  });

  it("should not create a car loan with installments bigger than 60 months", () => {
    expect(() => CarLoan.create(100_000, 10_000, 70)).toThrow(
      new Error("The maximum number of installments for car loan is 60")
    );
  });

  it("should not create a car loan when installment is bigger than 30% of mensal income", () => {
    expect(() => CarLoan.create(200_000, 10_000, 60)).toThrow(
      new Error("The installment amount could not exceed 30% of monthly income")
    );
  });
});
