// Strategy pattern
interface FareCalculator {
  calculate(checkInDate: Date, checkOutDate: Date): number;
}

export class AirportFareCalculator implements FareCalculator {
  calculate(checkInDate: Date, checkOutDate: Date): number {
    const diff =
      ((checkOutDate.getTime() - checkInDate.getTime()) / 1000) * 60 * 60;

    return diff * 10;
  }
}

export class ShoppingFareCalculator implements FareCalculator {
  calculate(checkInDate: Date, checkOutDate: Date): number {
    let total = 0;

    const diff =
      ((checkOutDate.getTime() - checkInDate.getTime()) / 1000) * 60 * 60;

    const remainingHours = diff - 3;

    if (remainingHours > 0) {
      total += diff * 10;
    }

    return total;
  }
}

export class FareCalculatorFactory {
  static create(location: string) {
    if (location === "airport") {
      return new AirportFareCalculator();
    }

    if (location === "shopping") {
      return new ShoppingFareCalculator();
    }

    throw new Error("location not found");
  }
}

export default FareCalculator;
