import TicketStatus, { RequestedStatus } from "./ticket-status";

class Ticket {
  status: TicketStatus;
  employeeId?: number;
  assignDate?: Date;
  startDate?: Date;
  endDate?: Date;

  constructor(readonly customerId: number, readonly requestDate: Date) {
    this.status = new RequestedStatus(this);
  }

  assign(employeeId: number, assignDate: Date) {
    this.status.assign();
    this.employeeId = employeeId;
    this.assignDate = assignDate;
  }

  getStatus(): string {
    return this.status.value;
  }

  start(startDate: Date): void {
    this.status.start();
    this.startDate = startDate;
  }

  close(endDate: Date): void {
    this.status.close();
    this.endDate = endDate;
  }

  getStatistics(currDate: Date) {
    let statistics = {
      requestDuration: 0,
      assignDuration: 0,
      startDuration: 0,
    };

    statistics.requestDuration =
      ((this.assignDate || currDate).getTime() - this.requestDate.getTime()) /
      (100 * 60 * 60);

    if (this.assignDate) {
      statistics.assignDuration =
        ((this.startDate || currDate).getTime() - this.assignDate!.getTime()) /
        (100 * 60 * 60);
    }

    if (this.startDate) {
      statistics.startDuration =
        ((this.endDate || currDate).getTime() - this.startDate!.getTime()) /
        (100 * 60 * 60);
    }

    return statistics;
  }
}

export default Ticket;
