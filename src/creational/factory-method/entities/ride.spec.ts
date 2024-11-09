import { describe, expect, it } from "vitest";
import { DistanceRide, TimeRide } from "./ride";
import Location from "./location";
import { DistanceSegment, TimeSegment } from "./segment";

describe("Ride", () => {
  it("should create a ride and calculate the fare based on distance", () => {
    const lastLocation = new Location(
      -27.496887588317275,
      -48.522234807851476,
      new Date("2024-03-01T10:00:00")
    );
    const newLocation = new Location(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T12:00:00")
    );
    const ride = DistanceRide.create(
      lastLocation.coord.lat,
      lastLocation.coord.long,
      lastLocation.date
    );
    const segment = new DistanceSegment(ride.rideId, lastLocation, newLocation);

    ride.updateLocation(newLocation);

    const fare = ride.calculateFare([segment]);

    expect(fare).toBe(40);
  });

  it("should create a ride and calculate the fare based on time", () => {
    const lastLocation = new Location(
      -27.496887588317275,
      -48.522234807851476,
      new Date("2024-03-01T10:00:00")
    );
    const newLocation = new Location(
      -27.584905257808835,
      -48.545022195325124,
      new Date("2024-03-01T12:00:00")
    );
    const ride = TimeRide.create(
      lastLocation.coord.lat,
      lastLocation.coord.long,
      lastLocation.date
    );
    const segment = new TimeSegment(ride.rideId, lastLocation, newLocation);

    ride.updateLocation(newLocation);

    const fare = ride.calculateFare([segment]);

    expect(fare).toBe(120);
  });
});
