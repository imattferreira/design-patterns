import Average from "../entities/average";
import AveragesRepository from "../repositories/averages-repository";
import GradesRepository from "../repositories/grades-repository";

class CalculateAverage {
  constructor(
    private readonly gradesRepository: GradesRepository,
    private readonly averagesRepository: AveragesRepository
  ) {}

  async execute(studentId: number): Promise<void> {
    const grades = await this.gradesRepository.findAllByStudentId(studentId);

    let total = 0;

    for (const grade of grades) {
      total += grade.value;
    }

    const average = new Average(studentId, total / grades.length);

    await this.averagesRepository.save(average);
  }
}

export default CalculateAverage;
