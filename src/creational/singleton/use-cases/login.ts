import UsersRepository, {
  UsersRepositoryInMemory,
} from "../repositories/users-repository";

interface Input {
  email: string;
  password: string;
}

interface Output {
  success: boolean;
}

export default class Login {
  private readonly usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = UsersRepositoryInMemory.getInstance();
  }

  async execute(input: Input): Promise<Output> {
    const user = await this.usersRepository.getByEmail(input.email);

    if (!user.passwordMatches(input.password)) {
      throw new Error("Authentication failed");
    }

    return { success: true };
  }
}
