import CalculateAverage from "./calculate-average";
import GradesRepository from "../repositories/grades-repository";
import Grade from "../entities/grade";

interface Input {
  studentId: number;
  exam: string;
  value: number;
}

class SaveGrade {
  constructor(
    private readonly gradesRepository: GradesRepository,
    private readonly calculateAverage: CalculateAverage
  ) {}

  async execute(input: Input): Promise<void> {
    const grade = new Grade(input.studentId, input.exam, input.value);

    await this.gradesRepository.save(grade);
    await this.calculateAverage.execute(input.studentId);
  }
}

export default SaveGrade;
