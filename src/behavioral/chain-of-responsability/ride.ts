import FareCalculator from "./fare-calculator";
import Segment from "./segment";

class Ride {
  segments: Segment[];
  private fare: number;

  constructor(readonly fareCalculator: FareCalculator) {
    this.segments = [];
    this.fare = 0;
  }

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare() {
    this.fare = 0;

    for (const segment of this.segments) {
      // Open-Closed Principle
      this.fare += this.fareCalculator.calculate(segment);
    }

    this.fare = this.fare > 10 ? this.fare : 10;
  }

  getFare() {
    this.calculateFare();

    return this.fare;
  }
}

export default Ride;
