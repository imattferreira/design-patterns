import ParkingTicket from "../entities/parking-ticket";

interface ParkingTicketsRepository {
  save(parkingTicket: ParkingTicket): Promise<void>;
  findByPlate(plate: string): Promise<ParkingTicket | null>;
  update(parkingTicket: ParkingTicket): Promise<void>;
}

export class ParkingTicketsRepositoryInMemory
  implements ParkingTicketsRepository
{
  private stored: ParkingTicket[];

  constructor() {
    this.stored = [];
  }

  async save(parkingTicket: ParkingTicket): Promise<void> {
    this.stored.push(parkingTicket);
  }

  async findByPlate(plate: string): Promise<ParkingTicket | null> {
    const ticket = this.stored.find(
      (parkingTicket) => parkingTicket.plate === plate
    );

    return ticket || null;
  }

  async update(parkingTicket: ParkingTicket): Promise<void> {
    const index = this.stored.findIndex(
      (ticket) => ticket.plate === parkingTicket.plate
    );

    if (index > 0) {
      this.stored[index] = parkingTicket;
    }
  }
}

export default ParkingTicketsRepository;
