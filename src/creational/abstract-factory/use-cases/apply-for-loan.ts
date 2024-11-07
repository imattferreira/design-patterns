import InstallmentsRepository from "../repositories/installments-repository";
import LoanFactory from "../factories/loan-factory";
import LoansRepository from "../repositories/loans-repository";
import RepositoryFactory from "../factories/repository-factory";

interface Input {
  amount: number;
  income: number;
  installments: number;
}

interface Output {
  loanId: string;
}

export default class ApplyForLoan {
  private readonly loansRepository: LoansRepository;
  private readonly installmentsRepository: InstallmentsRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    readonly loanFactory: LoanFactory
  ) {
    this.loansRepository = repositoryFactory.createLoansRepository();
    this.installmentsRepository =
      repositoryFactory.createInstallmentsRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = this.loanFactory.createLoan(
      input.amount,
      input.income,
      input.installments
    );
    const installmentsCalculator =
      this.loanFactory.createInstallmentCalculator();
    const installments = installmentsCalculator.calculate(loan);

    await this.loansRepository.save(loan);

    for (const installment of installments) {
      await this.installmentsRepository.save(installment);
    }

    return { loanId: loan.loanId };
  }
}
