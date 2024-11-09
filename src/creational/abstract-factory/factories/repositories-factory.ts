// Abstract-Factory
import InstallmentsRepository, {
  InstallmentsRepositoryInMemory,
} from "../repositories/installments-repository";
import LoansRepository, {
  LoansRepositoryInMemory,
} from "../repositories/loans-repository";

export default interface RepositoriesFactory {
  createLoansRepository(): LoansRepository;
  createInstallmentsRepository(): InstallmentsRepository;
}

export class RepositoriesInMemoryFactory implements RepositoriesFactory {
  createLoansRepository(): LoansRepository {
    return LoansRepositoryInMemory.getInstance();
  }

  createInstallmentsRepository(): InstallmentsRepository {
    return InstallmentsRepositoryInMemory.getInstance();
  }
}
