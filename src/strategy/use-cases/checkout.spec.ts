import { describe, expect, it } from "vitest";
import CheckIn from "./checkin";
import CheckOut from "./checkout";
import { ParkingTicketsRepositoryInMemory } from "../repositories/parking-tickets-repository";

describe("CheckOut", () => {
  it("should calculate the fare of parked car in airport", async () => {
    const parkingTicketsRepository = new ParkingTicketsRepositoryInMemory();
    const checkIn = new CheckIn(parkingTicketsRepository);
    const checkOut = new CheckOut(parkingTicketsRepository);

    const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");

    await checkIn.execute({
      plate,
      checkInDate: new Date("2023-03-01T10:00:00"),
      location: "airport",
    });

    const output = await checkOut.execute({
      plate,
      checkoutDate: new Date("2023-03-01T12:00:00"),
    });

    expect(output.fare).toBe(20);
  });

  it("should calculate the fare of parked car in shopping", async () => {
    const parkingTicketsRepository = new ParkingTicketsRepositoryInMemory();
    const checkIn = new CheckIn(parkingTicketsRepository);
    const checkOut = new CheckOut(parkingTicketsRepository);

    const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");

    await checkIn.execute({
      plate,
      checkInDate: new Date("2023-03-01T10:00:00"),
      location: "shopping",
    });

    const output = await checkOut.execute({
      plate,
      checkoutDate: new Date("2023-03-01T15:00:00"),
    });

    expect(output.fare).toBe(30);
  });
});
