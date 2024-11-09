import InstallmentsRepository from "../repositories/installments-repository";
import LoansRepository from "../repositories/loans-repository";
import RepositoriesFactory from "../factories/repositories-factory";

interface Input {
  loanId: string;
}

interface Output {
  amount: number;
  income: number;
  installments: {
    number: number;
    amount: number;
    amortization: number;
    interest: number;
    balance: number;
  }[];
}

export default class GetLoan {
  private readonly loansRepository: LoansRepository;
  private readonly installmentsRepository: InstallmentsRepository;

  constructor(repositoriesFactory: RepositoriesFactory) {
    this.loansRepository = repositoriesFactory.createLoansRepository();
    this.installmentsRepository =
      repositoriesFactory.createInstallmentsRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = await this.loansRepository.getById(input.loanId);
    const installments = await this.installmentsRepository.listByLoanId(
      input.loanId
    );

    return {
      amount: loan.amount,
      income: loan.income,
      installments: installments.map((installment) => ({
        amortization: installment.amortization,
        amount: installment.amount,
        balance: installment.balance,
        interest: installment.interest,
        number: installment.number,
      })),
    };
  }
}
