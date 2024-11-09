import FlightTicketBuilder from "./flight-ticket-builder";

export default class FlightTicket {
  fromAirport: string;
  toAirport: string;
  airline: string;
  flightCode: string;
  passengerName: string;
  passengerEmail: string;
  passengerDocument: string;
  passengerGender: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  hasCheckIn: boolean;
  terminal: string;
  gate: string;
  priority: number;
  seat: string;
  checkedBags: number;

  constructor(builder: FlightTicketBuilder) {
    this.fromAirport = builder.fromAirport;
    this.toAirport = builder.toAirport;
    this.airline = builder.airline;
    this.flightCode = builder.flightCode;
    this.passengerName = builder.passengerName;
    this.passengerEmail = builder.passengerEmail;
    this.passengerDocument = builder.passengerDocument;
    this.passengerGender = builder.passengerGender;
    this.emergencyContactName = builder.emergencyContactName;
    this.emergencyContactPhone = builder.emergencyContactPhone;
    this.hasCheckIn = builder.hasCheckIn;
    this.terminal = builder.terminal;
    this.gate = builder.gate;
    this.priority = builder.priority;
    this.seat = builder.seat;
    this.checkedBags = builder.checkedBags;
  }
}
