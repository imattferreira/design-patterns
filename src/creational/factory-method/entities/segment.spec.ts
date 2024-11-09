import { describe, expect, it } from "vitest";
import Location from "./location";
import { DistanceSegment, TimeSegment } from "./segment";

describe("Segment", () => {
  it("should create a segment by distance", () => {
    const from = new Location(
      -27.496887588317275,
      -48.522234807851476,
      new Date("2024-03-01T10:00:00")
    );
    const to = new Location(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T12:00:00")
    );

    const timeSegment = new DistanceSegment("", from, to);

    expect(timeSegment.getDistance()).toBe(10);
  });

  it("should create a segment by time", () => {
    const from = new Location(
      -27.496887588317275,
      -48.522234807851476,
      new Date("2024-03-01T10:00:00")
    );
    const to = new Location(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T12:00:00")
    );

    const timeSegment = new TimeSegment("", from, to);

    expect(timeSegment.getDiffInMinutes()).toBe(120);
  });
});
