import { describe, expect, it } from "vitest";
import FlightTicket from "./flight-ticket";
import FlightTicketBuilder from "./flight-ticket-builder";

describe("FlightTicket", () => {
  it("should create a flight ticket", () => {
    const builder = new FlightTicketBuilder();

    // Fluent Interface
    builder
      .setFlight("Azul", "9876")
      .setTrip("FLN", "GRU")
      .setPassenger("John Doe", "john@doe.com", "111.111.111-11", "M")
      .setEmergencyContact("Bob Simpson", "55119999999")
      .setSeat("8A")
      .setCheckedBags(2)
      .setCheckInInformation(true, "1", "4A")
      .setPriority(5);

    const flightTicket = new FlightTicket(builder);

    expect(flightTicket.passengerName).toBe("John Doe");
  });
});
