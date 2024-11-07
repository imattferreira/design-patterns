import InstallmentsRepository from "../repositories/installments-repository";
import LoansRepository from "../repositories/loans-repository";
import RepositoryFactory from "../factories/repository-factory";

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

  constructor(repositoryFactory: RepositoryFactory) {
    this.loansRepository = repositoryFactory.createLoansRepository();
    this.installmentsRepository =
      repositoryFactory.createInstallmentsRepository();
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
