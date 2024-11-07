// Abstract-Factory

import InstallmentCalculator, {
  PRICEInstallmentCalculator,
  SACInstallmentCalculator,
} from "../entities/installment-calculator";
import Loan, { CarLoan, MortgageLoan } from "../entities/loan";

export default interface LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan;
  createInstallmentCalculator(): InstallmentCalculator;
}

export class MortgageLoanFactory implements LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan {
    return MortgageLoan.create(amount, income, installments);
  }

  createInstallmentCalculator(): InstallmentCalculator {
    return new SACInstallmentCalculator();
  }
}

export class CarLoanFactory implements LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan {
    return CarLoan.create(amount, income, installments);
  }

  createInstallmentCalculator(): InstallmentCalculator {
    return new PRICEInstallmentCalculator();
  }
}
