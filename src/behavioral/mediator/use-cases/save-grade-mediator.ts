import GradesRepository from "../repositories/grades-repository";
import Grade from "../entities/grade";
import Mediator from "../mediator";

interface Input {
  studentId: number;
  exam: string;
  value: number;
}

class SaveGradeMediator {
  constructor(
    private readonly gradesRepository: GradesRepository,
    private readonly mediator: Mediator
  ) {}

  async execute(input: Input): Promise<void> {
    const grade = new Grade(input.studentId, input.exam, input.value);

    await this.gradesRepository.save(grade);
    this.mediator.notify("grade-saved", { studentId: input.studentId });
  }
}

export default SaveGradeMediator;
