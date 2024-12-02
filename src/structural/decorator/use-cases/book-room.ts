import Booking from "../entities/booking";
import BookingsRepository from "../repositories/bookings-repository";
import RoomsRepository from "../repositories/rooms-repository";

interface Input {
  email: string;
  checkInDate: Date;
  checkOutDate: Date;
  category: string;
}

interface Output {
  code: string;
}

class BookRoom {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly roomsRepository: RoomsRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const [availableRoom] =
      await this.roomsRepository.getAvailableRoomsByPeriodAndCategory(
        input.checkInDate,
        input.checkOutDate,
        input.category
      );

    if (!availableRoom) {
      throw new Error("Room is not available");
    }

    const booking = Booking.create(
      input.email,
      availableRoom,
      input.checkInDate,
      input.checkOutDate
    );

    await this.bookingsRepository.save(booking);

    return {
      code: booking.code,
    };
  }
}

export default BookRoom;
