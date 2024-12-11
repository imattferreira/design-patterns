import Grade from "../entities/grade";

interface GradesRepository {
  save(grade: Grade): Promise<void>;
  findAllByStudentId(studentId: number): Promise<Grade[]>;
}

export class GradesRepositoryInMemory implements GradesRepository {
  private stored: Grade[];

  constructor() {
    this.stored = [];
  }

  async save(grade: Grade): Promise<void> {
    this.stored.push(grade);
  }

  async findAllByStudentId(studentId: number): Promise<Grade[]> {
    return this.stored.filter((grade) => grade.studentId === studentId);
  }
}

export default GradesRepository;
