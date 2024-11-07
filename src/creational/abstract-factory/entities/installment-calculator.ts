import currency from "currency.js";
import Installment from "./installment";
import Loan from "./loan";

export default interface InstallmentCalculator {
  calculate(loan: Loan): Installment[];
}

export class SACInstallmentCalculator implements InstallmentCalculator {
  calculate(loan: Loan): Installment[] {
    const installments: Installment[] = [];
    const rate = loan.rate / 100 / 12;
    let balance = currency(loan.amount);
    const amortization = currency(balance.value / loan.installments);
    let installmentNumber = 1;

    while (balance.value > 0.1) {
      const interest = balance.multiply(rate);
      const updatedBalance = balance.add(interest);
      const amount = interest.add(amortization);

      balance = updatedBalance.subtract(amount);

      if (balance.value < 0.1) {
        balance = currency(0);
      }

      installments.push(
        new Installment(
          loan.loanId,
          installmentNumber,
          amount.value,
          amortization.value,
          interest.value,
          balance.value
        )
      );
      installmentNumber++;
    }

    return installments;
  }
}

export class PRICEInstallmentCalculator implements InstallmentCalculator {
  calculate(loan: Loan): Installment[] {
    const installments: Installment[] = [];
    const rate = loan.rate / 100 / 12;
    let balance = currency(loan.amount);
    const formula = Math.pow(1 + rate, loan.installments);
    const amount = balance.multiply((formula * rate) / (formula - 1));
    let installmentNumber = 1;

    while (balance.value > 0.1) {
      const interest = balance.multiply(rate);
      const amortization = amount.subtract(interest);

      balance = balance.subtract(amortization);

      if (balance.value < 2) {
        balance = currency(0);
      }

      installments.push(
        new Installment(
          loan.loanId,
          installmentNumber,
          amount.value,
          amortization.value,
          interest.value,
          balance.value
        )
      );
      installmentNumber++;
    }

    return installments;
  }
}
