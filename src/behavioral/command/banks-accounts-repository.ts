import BankAccount from "./bank-account";

export default interface BanksAccountsRepository {
  save(bankAccount: BankAccount): Promise<void>;
  update(bankAccount: BankAccount): Promise<void>;
  findById(bankAccountId: number): Promise<BankAccount>;
}

export class BanksAccountsRepositoryInMemory
  implements BanksAccountsRepository
{
  private stored: BankAccount[];

  constructor() {
    this.stored = [];
  }

  async save(bankAccount: BankAccount): Promise<void> {
    this.stored.push(bankAccount);
  }

  async update(bankAccount: BankAccount): Promise<void> {
    const index = this.stored.findIndex((b) => b.id === bankAccount.id);

    this.stored[index] = bankAccount;
  }

  async findById(bankAccountId: number): Promise<BankAccount> {
    const bankAccount = this.stored.find((b) => b.id === bankAccountId);

    if (!bankAccount) {
      throw new Error("bank account not found");
    }

    return bankAccount;
  }
}
