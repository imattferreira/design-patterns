import Average from "../entities/average";

interface AveragesRepository {
  save(average: Average): Promise<void>;
  findByStudentId(studentId: number): Promise<Average>;
}

export class AveragesRepositoryInMemory implements AveragesRepository {
  private stored: Average[];

  constructor() {
    this.stored = [];
  }

  async save(average: Average): Promise<void> {
    this.stored.push(average);
  }

  async findByStudentId(studentId: number): Promise<Average> {
    const avg = this.stored.find((a) => a.studentId === studentId);

    if (!avg) {
      throw new Error("average not found");
    }

    return avg;
  }
}

export default AveragesRepository;
