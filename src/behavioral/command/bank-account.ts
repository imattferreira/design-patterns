import Transaction from "./transaction";

class BankAccount {
  private transactions: Transaction[];

  constructor(readonly id: number) {
    this.transactions = [];
  }

  debit(amount: number) {
    this.transactions.push(new Transaction("debit", amount));
  }

  credit(amount: number) {
    this.transactions.push(new Transaction("credit", amount));
  }

  getBalance() {
    return this.transactions.reduce(
      (p, c) => (c.type === "credit" ? p + c.amount : p - c.amount),
      0
    );
  }
}

export default BankAccount;
