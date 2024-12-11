import ParkingTicket from "../entities/parking-ticket";
import ParkingTicketsRepository from "../repositories/parking-tickets-repository";

interface Input {
  plate: string;
  checkInDate: Date;
  location: string;
}

class CheckIn {
  constructor(
    private readonly parkingTicketsRepository: ParkingTicketsRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const existingTicket = await this.parkingTicketsRepository.findByPlate(
      input.plate
    );

    if (existingTicket) {
      throw new Error("duplicated plate");
    }

    const ticket = new ParkingTicket(
      input.plate,
      input.checkInDate,
      input.location
    );

    await this.parkingTicketsRepository.save(ticket);
  }
}

export default CheckIn;
