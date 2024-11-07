// Abstract-Factory
import InstallmentsRepository, {
  InstallmentsRepositoryInMemory,
} from "../repositories/installments-repository";
import LoansRepository, {
  LoansRepositoryInMemory,
} from "../repositories/loans-repository";

export default interface RepositoryFactory {
  createLoansRepository(): LoansRepository;
  createInstallmentsRepository(): InstallmentsRepository;
}

export class RepositoryInMemoryFactory implements RepositoryFactory {
  createLoansRepository(): LoansRepository {
    return LoansRepositoryInMemory.getInstance();
  }

  createInstallmentsRepository(): InstallmentsRepository {
    return InstallmentsRepositoryInMemory.getInstance();
  }
}
