import { randomUUID } from "crypto";
import Location from "./location";
import Segment, { DistanceSegment, TimeSegment } from "./segment";

export default abstract class Ride {
  rideId: string;
  lastLocation: Location;

  constructor(rideId: string, lat: number, long: number, date: Date) {
    this.rideId = rideId;
    this.lastLocation = new Location(lat, long, date);
  }

  updateLocation(newLocation: Location) {
    this.lastLocation = newLocation;
  }

  abstract calculateFare(segments: Segment[]): number;

  // Factory Method
  abstract createSegment(from: Location, to: Location): Segment;
}

export class DistanceRide extends Ride {
  calculateFare(segments: DistanceSegment[]): number {
    let total = 0;

    for (const segment of segments) {
      total += segment.getDistance();
    }

    return total * 4;
  }

  // Static Factory Method
  static create(lat: number, long: number, date: Date) {
    return new DistanceRide(randomUUID(), lat, long, date);
  }

  createSegment(from: Location, to: Location): Segment {
    return new DistanceSegment(this.rideId, from, to);
  }
}

export class TimeRide extends Ride {
  calculateFare(segments: TimeSegment[]): number {
    let total = 0;

    for (const segment of segments) {
      total += segment.getDiffInMinutes();
    }

    return total;
  }

  // Static Factory Method
  static create(lat: number, long: number, date: Date) {
    return new TimeRide(randomUUID(), lat, long, date);
  }

  createSegment(from: Location, to: Location): Segment {
    return new TimeSegment(this.rideId, from, to);
  }
}
