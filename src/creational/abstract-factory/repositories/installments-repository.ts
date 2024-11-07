import Installment from "../entities/installment";

export default interface InstallmentsRepository {
  save(loan: Installment): Promise<void>;
  listByLoanId(loanId: string): Promise<Installment[]>;
}

export class InstallmentsRepositoryInMemory implements InstallmentsRepository {
  private loans: Installment[];
  static instance: InstallmentsRepositoryInMemory;

  private constructor() {
    this.loans = [];
  }

  static getInstance() {
    if (!InstallmentsRepositoryInMemory.instance) {
      InstallmentsRepositoryInMemory.instance =
        new InstallmentsRepositoryInMemory();
    }

    return InstallmentsRepositoryInMemory.instance;
  }

  async save(loan: Installment): Promise<void> {
    this.loans.push(loan);
  }

  async listByLoanId(loanId: string): Promise<Installment[]> {
    return this.loans.filter((installment) => installment.loanId === loanId);
  }
}
