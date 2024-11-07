import Loan from "../entities/loan";

export default interface LoansRepository {
  save(loan: Loan): Promise<void>;
  getById(loanId: string): Promise<Loan>;
}

export class LoansRepositoryInMemory implements LoansRepository {
  private loans: Loan[];
  static instance: LoansRepositoryInMemory;

  private constructor() {
    this.loans = [];
  }

  static getInstance() {
    if (!LoansRepositoryInMemory.instance) {
      LoansRepositoryInMemory.instance = new LoansRepositoryInMemory();
    }

    return LoansRepositoryInMemory.instance;
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan);
  }

  async getById(loanId: string): Promise<Loan> {
    const loan = this.loans.find((loan) => loan.loanId === loanId);

    if (!loan) {
      throw new Error("Loan not found");
    }

    return loan;
  }
}
