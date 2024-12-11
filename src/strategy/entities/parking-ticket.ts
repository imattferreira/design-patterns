import { FareCalculatorFactory } from "../fare-calculator";

class ParkingTicket {
  fare: number;
  checkOutDate?: Date;

  constructor(
    readonly plate: string,
    readonly checkInDate: Date,
    readonly location: string
  ) {
    this.fare = 0;
  }

  checkout(checkOutDate: Date) {
    const fareCalculator = FareCalculatorFactory.create(this.location);

    this.fare = fareCalculator.calculate(this.checkInDate, checkOutDate);
    this.checkOutDate = checkOutDate;
  }
}

export default ParkingTicket;
