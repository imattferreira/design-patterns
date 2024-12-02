class LogDecorator {
  constructor(private readonly executor: any) {}

  async execute(input: any): Promise<any> {
    console.log({ input });
    return this.executor.execute(input);
  }
}

export default LogDecorator;
