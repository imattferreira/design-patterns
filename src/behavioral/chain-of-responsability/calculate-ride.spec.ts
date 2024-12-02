import { describe, expect, it } from "vitest";
import Ride from "./ride";
import { beforeEach } from "node:test";
import {
  NormalFareCalculator,
  NormalSundayFareCalculator,
  OvernightFareCalculator,
  OvernightSundayFareCalculator,
} from "./fare-calculator";

let ride: Ride;

beforeEach(() => {
  // Chain-Of-Responsibility
  const overnightSundayFareCalculator = new OvernightSundayFareCalculator();
  const normalSundayFareCalculator = new NormalSundayFareCalculator(
    overnightSundayFareCalculator
  );
  const overnightFareCalculator = new OvernightFareCalculator(
    normalSundayFareCalculator
  );
  const normalFareCalculator = new NormalFareCalculator(
    overnightFareCalculator
  );

  ride = new Ride(normalFareCalculator);
});

describe("CalculateRide", () => {
  it("should calculate the fare of a ride in a normal date", () => {
    const segments = [{ distance: 10, date: new Date("2021-03-01T10:00:00") }];

    for (const segment of segments) {
      ride.addSegment(segment.distance, segment.date);
    }

    ride.calculateFare();

    expect(ride.getFare()).toBe(21);
  });

  it("should calculate the fare of a ride with the minimum fare", () => {
    const segments = [{ distance: 2, date: new Date("2021-03-01T10:00:00") }];

    for (const segment of segments) {
      ride.addSegment(segment.distance, segment.date);
    }

    ride.calculateFare();

    expect(ride.getFare()).toBe(10);
  });

  it("should calculate the fare of a ride in a night date", () => {
    const segments = [{ distance: 10, date: new Date("2021-03-01T23:00:00") }];

    for (const segment of segments) {
      ride.addSegment(segment.distance, segment.date);
    }

    ride.calculateFare();

    expect(ride.getFare()).toBe(39);
  });

  it("should calculate the fare of a ride in a Sunday", () => {
    const segments = [{ distance: 10, date: new Date("2021-03-07T10:00:00") }];

    for (const segment of segments) {
      ride.addSegment(segment.distance, segment.date);
    }

    ride.calculateFare();

    expect(ride.getFare()).toBe(29);
  });

  it("should calculate the fare of a ride in a Sunday night", () => {
    const segments = [{ distance: 10, date: new Date("2021-03-07T23:00:00") }];

    for (const segment of segments) {
      ride.addSegment(segment.distance, segment.date);
    }

    ride.calculateFare();

    expect(ride.getFare()).toBe(50);
  });

  it("should not calculate the fare of a ride with an invalid distance", () => {
    expect(() => ride.addSegment(-10, new Date())).toThrow("invalid date");
  });

  it("should not calculate the fare of a ride with an invalid date", () => {
    // @ts-ignore
    expect(() => ride.addSegment(10, "dasas")).toThrow("invalid date");
  });
});
