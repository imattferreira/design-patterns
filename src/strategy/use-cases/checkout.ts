import ParkingTicketsRepository from "../repositories/parking-tickets-repository";

interface Input {
  plate: string;
  checkoutDate: Date;
}

interface Output {
  fare: number;
}

class CheckOut {
  constructor(
    private readonly parkingTicketsRepository: ParkingTicketsRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const ticket = await this.parkingTicketsRepository.findByPlate(input.plate);

    if (!ticket) {
      throw new Error("ticket not found");
    }

    ticket.checkout(input.checkoutDate);

    await this.parkingTicketsRepository.update(ticket);

    return { fare: 0 };
  }
}

export default CheckOut;
