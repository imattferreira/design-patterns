import { describe, expect, it } from "vitest";
import UpdateLocation from "./update-location";
import { RidesRepositoryInMemory } from "../repositories/rides-repository";
import { SegmentsRepositoryInMemory } from "../repositories/segments-repository";
import { DistanceRide, TimeRide } from "../entities/ride";
import CalculateFare from "./calculate-fare";

describe("UpdateLocation", () => {
  it("should update the location ride by distance", async () => {
    const ridesRepository = new RidesRepositoryInMemory();
    const segmentsRepository = new SegmentsRepositoryInMemory();
    const ride = DistanceRide.create(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T10:00:00")
    );

    await ridesRepository.save(ride);

    const updateLocation = new UpdateLocation(
      ridesRepository,
      segmentsRepository
    );
    const input = {
      rideId: ride.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2024-03-01T12:00:00"),
    };

    await updateLocation.execute(input);

    const calculateFare = new CalculateFare(
      ridesRepository,
      segmentsRepository
    );
    const output = await calculateFare.execute({
      rideId: ride.rideId,
    });

    expect(output.fare).toBe(40);
  });

  it("should update the location ride by time", async () => {
    const ridesRepository = new RidesRepositoryInMemory();
    const segmentsRepository = new SegmentsRepositoryInMemory();
    const ride = TimeRide.create(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T10:00:00")
    );

    await ridesRepository.save(ride);

    const updateLocation = new UpdateLocation(
      ridesRepository,
      segmentsRepository
    );
    const input = {
      rideId: ride.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date("2024-03-01T12:00:00"),
    };

    await updateLocation.execute(input);

    const calculateFare = new CalculateFare(
      ridesRepository,
      segmentsRepository
    );
    const output = await calculateFare.execute({
      rideId: ride.rideId,
    });

    expect(output.fare).toBe(120);
  });
});
