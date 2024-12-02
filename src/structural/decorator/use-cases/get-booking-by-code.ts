import BookingsRepository from "../repositories/bookings-repository";

interface Output {
  duration: number;
  price: number;
}

class GetBookingByCode {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async execute(bookingCode: string): Promise<Output> {
    const booking = await this.bookingsRepository.findByCode(bookingCode);

    return {
      duration: booking.duration,
      price: booking.price,
    };
  }
}

export default GetBookingByCode;
