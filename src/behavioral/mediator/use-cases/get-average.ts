import AveragesRepository from "../repositories/averages-repository";

class GetAverage {
  constructor(private readonly averagesRepository: AveragesRepository) {}

  async execute(studentId: number): Promise<number> {}
}

export default GetAverage;
