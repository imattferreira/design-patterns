import User from "../entities/user";
import UsersRepository, {
  UsersRepositoryInMemory,
} from "../repositories/users-repository";

interface Input {
  name: string;
  email: string;
  password: string;
}

export default class SignUp {
  private readonly usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = UsersRepositoryInMemory.getInstance();
  }

  async execute(input: Input): Promise<void> {
    const user = User.create(input.name, input.email, input.password);

    await this.usersRepository.save(user);
  }
}
