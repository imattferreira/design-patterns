import Segment from "./segment";

export default interface FareCalculator {
  // like Iterator pattern
  next?: FareCalculator;
  calculate(segment: Segment): number;
}

export class NormalFareCalculator implements FareCalculator {
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * 2.1;
    }

    if (!this.next) {
      throw new Error();
    }

    return this.next.calculate(segment);
  }
}

export class NormalSundayFareCalculator implements FareCalculator {
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && segment.isSunday()) {
      return segment.distance * 2.9;
    }

    if (!this.next) {
      throw new Error();
    }

    return this.next.calculate(segment);
  }
}

export class OvernightFareCalculator implements FareCalculator {
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday()) {
      return segment.distance * 3.9;
    }

    if (!this.next) {
      throw new Error();
    }

    return this.next.calculate(segment);
  }
}

export class OvernightSundayFareCalculator implements FareCalculator {
  constructor(readonly next?: FareCalculator) {}

  calculate(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday()) {
      return segment.distance * 5;
    }

    if (!this.next) {
      throw new Error();
    }

    return this.next.calculate(segment);
  }
}
