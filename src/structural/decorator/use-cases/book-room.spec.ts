import { describe, expect, it } from "vitest";
import { RoomsRepositoryInMemory } from "../repositories/rooms-repository";
import { BookingsRepositoryInMemory } from "../repositories/bookings-repository";
import BookRoom from "./book-room";
import GetBookingByCode from "./get-booking-by-code";
import LogDecorator from "../decorators/log-decorator";

describe("BookRoom", () => {
  it("should be able to book a room", async () => {
    const roomsRepository = new RoomsRepositoryInMemory();
    const bookingsRepository = new BookingsRepositoryInMemory();
    const bookRoom = new BookRoom(bookingsRepository, roomsRepository);
    const getBookingByCode = new LogDecorator(
      new GetBookingByCode(bookingsRepository)
    );

    const input = {
      email: "john@doe.com",
      checkInDate: new Date("2021-03-01RT10:00:00"),
      checkOutDate: new Date("2021-03-05RT10:00:00"),
      category: "suite",
    };

    const bookRoomOutput = await bookRoom.execute(input);

    const bookingCode = bookRoomOutput.code;

    const getBookingByCodeOutput = await getBookingByCode.execute(bookingCode);

    expect(getBookingByCodeOutput.duration).toBe(4);
    expect(getBookingByCodeOutput.price).toBe(2000);

    // const cancelBooking = new CancelBooking(bookingsRepository);

    // await cancelBooking.execute(bookingCode);
  });
});
