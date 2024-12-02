import BanksAccountsRepository from "./banks-accounts-repository";

interface Output {
  balance: number;
}

class GetBalance {
  constructor(
    private readonly banksAccountsRepository: BanksAccountsRepository
  ) {}

  async execute(bankAccountId: number): Promise<Output> {
    const bankAccount = await this.banksAccountsRepository.findById(
      bankAccountId
    );

    const balance = bankAccount.getBalance();

    return { balance };
  }
}

export default GetBalance;
