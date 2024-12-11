import { describe, expect, it } from "vitest";
import { GradesRepositoryInMemory } from "../repositories/grades-repository";
import { AveragesRepositoryInMemory } from "../repositories/averages-repository";
import CalculateAverage from "./calculate-average";
import SaveGrade from "./save-grade";
import GetAverage from "./get-average";
import SaveGradeMediator from "./save-grade-mediator";
import Mediator from "../mediator";

describe("SaveGrade", () => {
  it("should save the student grade and calculate your average", async () => {
    const gradesRepository = new GradesRepositoryInMemory();
    const averagesRepository = new AveragesRepositoryInMemory();
    const calculateAverage = new CalculateAverage(
      gradesRepository,
      averagesRepository
    );
    const saveGrade = new SaveGrade(gradesRepository, calculateAverage);
    const getAverage = new GetAverage(averagesRepository);

    const studentId = Math.round(Math.random() * 100_000_000);

    await saveGrade.execute({
      studentId,
      exam: "P1",
      value: 10,
    });
    await saveGrade.execute({
      studentId,
      exam: "P2",
      value: 9,
    });
    await saveGrade.execute({
      studentId,
      exam: "P3",
      value: 8,
    });

    const output = getAverage.execute(studentId);

    expect(output).toBe(9);
  });

  it("should save the student grade and calculate your average using mediator", async () => {
    const gradesRepository = new GradesRepositoryInMemory();
    const averagesRepository = new AveragesRepositoryInMemory();
    const calculateAverage = new CalculateAverage(
      gradesRepository,
      averagesRepository
    );
    const mediator = new Mediator();

    mediator.register(
      "grade-saved",
      async ({ studentId }: any) => await calculateAverage.execute(studentId)
    );

    const saveGrade = new SaveGradeMediator(gradesRepository, mediator);
    const getAverage = new GetAverage(averagesRepository);

    const studentId = Math.round(Math.random() * 100_000_000);

    await saveGrade.execute({
      studentId,
      exam: "P1",
      value: 10,
    });
    await saveGrade.execute({
      studentId,
      exam: "P2",
      value: 9,
    });
    await saveGrade.execute({
      studentId,
      exam: "P3",
      value: 8,
    });

    const output = getAverage.execute(studentId);

    expect(output).toBe(9);
  });
});
