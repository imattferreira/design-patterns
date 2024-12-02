import Booking from "../entities/booking";

export default interface BookingsRepository {
  save(booking: Booking): Promise<void>;
  findByCode(bookingCode: string): Promise<Booking>;
}

export class BookingsRepositoryInMemory implements BookingsRepository {
  stored: Booking[];

  constructor() {
    this.stored = [];
  }

  async save(booking: Booking): Promise<void> {
    this.stored.push(booking);
  }

  async findByCode(bookingCode: string): Promise<Booking> {
    const booking = this.stored.find((booking) => booking.code === bookingCode);

    if (!booking) {
      throw new Error("booking not found");
    }

    return booking;
  }
}
