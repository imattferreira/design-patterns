import InstallmentsRepository from "../repositories/installments-repository";
import LoansFactory from "../factories/loans-factory";
import LoansRepository from "../repositories/loans-repository";
import RepositoriesFactory from "../factories/repositories-factory";

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
    repositoriesFactory: RepositoriesFactory,
    readonly loansFactory: LoansFactory
  ) {
    this.loansRepository = repositoriesFactory.createLoansRepository();
    this.installmentsRepository =
      repositoriesFactory.createInstallmentsRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = this.loansFactory.createLoan(
      input.amount,
      input.income,
      input.installments
    );
    const installmentsCalculator =
      this.loansFactory.createInstallmentCalculator();
    const installments = installmentsCalculator.calculate(loan);

    await this.loansRepository.save(loan);

    for (const installment of installments) {
      await this.installmentsRepository.save(installment);
    }

    return { loanId: loan.loanId };
  }
}
