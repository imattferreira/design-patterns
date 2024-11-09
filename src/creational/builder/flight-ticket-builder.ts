import FlightTicket from "./flight-ticket";

// Sometimes polymorphism can help more a little bit
export default class FlightTicketBuilder {
  fromAirport!: string;
  toAirport!: string;
  airline!: string;
  flightCode!: string;
  passengerName!: string;
  passengerEmail!: string;
  passengerDocument!: string;
  passengerGender!: string;
  emergencyContactName!: string;
  emergencyContactPhone!: string;
  hasCheckIn!: boolean;
  terminal!: string;
  gate!: string;
  priority!: number;
  seat!: string;
  checkedBags!: number;

  setFlight(airline: string, code: string): FlightTicketBuilder {
    this.airline = airline;
    this.flightCode = code;

    return this;
  }

  setTrip(from: string, to: string): FlightTicketBuilder {
    this.fromAirport = from;
    this.toAirport = to;

    return this;
  }
  setPassenger(
    name: string,
    email: string,
    document: string,
    gender: string
  ): FlightTicketBuilder {
    this.passengerName = name;
    this.passengerEmail = email;
    this.passengerDocument = document;
    this.passengerGender = gender;

    return this;
  }

  setEmergencyContact(name: string, phone: string): FlightTicketBuilder {
    this.emergencyContactName = name;
    this.emergencyContactPhone = phone;

    return this;
  }

  setCheckInInformation(
    hasCheckIn: boolean,
    terminal: string,
    gate: string
  ): FlightTicketBuilder {
    this.hasCheckIn = hasCheckIn;
    this.terminal = terminal;
    this.gate = gate;

    return this;
  }

  setPriority(priority: number): FlightTicketBuilder {
    this.priority = priority;

    return this;
  }

  setSeat(seat: string): FlightTicketBuilder {
    this.seat = seat;

    return this;
  }

  setCheckedBags(checkedBags: number): FlightTicketBuilder {
    this.checkedBags = checkedBags;

    return this;
  }

  getFlightTicket(): FlightTicket {
    return new FlightTicket(this);
  }
}
