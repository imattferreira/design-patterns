import BankAccount from "./bank-account";

// Command Pattern
// Very similar with domain-service
class TransferCommand {
  constructor(
    readonly from: BankAccount,
    readonly to: BankAccount,
    readonly amount: number
  ) {}

  execute(): void {
    this.from.debit(this.amount);
    this.from.credit(this.amount);
  }
}

export default TransferCommand;
