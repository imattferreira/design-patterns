import BanksAccountsRepository from "./banks-accounts-repository";
import TransferCommand from "./transfer-command";

interface Input {
  fromBankAccountId: number;
  toBankAccountId: number;
  amount: number;
}

class MakeTransfer {
  constructor(
    private readonly banksAccountsRepository: BanksAccountsRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const from = await this.banksAccountsRepository.findById(
      input.fromBankAccountId
    );
    const to = await this.banksAccountsRepository.findById(
      input.toBankAccountId
    );

    const transferCommand = new TransferCommand(from, to, input.amount);

    transferCommand.execute();

    await this.banksAccountsRepository.update(from);
    await this.banksAccountsRepository.update(to);
  }
}

export default MakeTransfer;
