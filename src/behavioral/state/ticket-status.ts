// State Pattern
// Similar to State Machines (?!)
import Ticket from "./ticket";

interface TicketStatus {
  value: string;

  assign(): void;
  start(): void;
  close(): void;
}

export class RequestedStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "requested";
  }

  assign(): void {
    this.ticket.status = new AssignedStatus(this.ticket);
  }

  start(): void {
    throw new Error("could not start ticket");
  }

  close(): void {
    throw new Error("could not close ticket");
  }
}

class AssignedStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "assigned";
  }

  assign(): void {
    throw new Error("could not assign ticket");
  }

  start(): void {
    this.ticket.status = new InProgressStatus(this.ticket);
  }

  close(): void {
    throw new Error("could not close ticket");
  }
}

class InProgressStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "in_progress";
  }

  assign(): void {
    throw new Error("could not assign ticket");
  }

  start(): void {
    throw new Error("could not start ticket");
  }

  close(): void {
    this.ticket.status = new ClosedStatus(this.ticket);
  }
}

class ClosedStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "closed";
  }

  assign(): void {
    throw new Error("could not assign ticket");
  }

  start(): void {
    throw new Error("could not start ticket");
  }

  close(): void {
    throw new Error("could not close ticket");
  }
}

export default TicketStatus;
