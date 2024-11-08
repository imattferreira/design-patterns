import User from "../entities/user";

export default interface UsersRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}

export class UsersRepositoryInMemory implements UsersRepository {
  private readonly users: User[];
  static instance: UsersRepository;

  private constructor() {
    this.users = [];
  }

  static getInstance(): UsersRepository {
    if (!UsersRepositoryInMemory.instance) {
      UsersRepositoryInMemory.instance = new UsersRepositoryInMemory();
    }

    return UsersRepositoryInMemory.instance;
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
