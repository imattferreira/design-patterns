import crypto from "node:crypto";
import Room from "./room";

class Booking {
  constructor(
    readonly code: string,
    readonly roomId: number,
    readonly email: string,
    readonly checkInDate: Date,
    readonly checkOutDate: Date,
    readonly duration: number,
    readonly price: number
  ) {}

  static create(
    email: string,
    room: Room,
    checkInDate: Date,
    checkOutDate: Date
  ) {
    const code = crypto.randomUUID();
    const roomId = room.id;
    const duration =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
    const price = duration * room.price;

    return new Booking(
      code,
      roomId,
      email,
      checkInDate,
      checkOutDate,
      duration,
      price
    );
  }
}

export default Booking;
