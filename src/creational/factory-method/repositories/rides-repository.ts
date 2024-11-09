import Ride from "../entities/ride";

export default interface RidesRepository {
  save(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
  getById(rideId: string): Promise<Ride>;
}

export class RidesRepositoryInMemory implements RidesRepository {
  private rides: Ride[];

  constructor() {
    this.rides = [];
  }
  async getById(rideId: string): Promise<Ride> {
    const ride = this.rides.find((r) => r.rideId === rideId);

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  }

  async save(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }

  async update(ride: Ride): Promise<void> {
    const index = this.rides.findIndex((r) => r.rideId === ride.rideId);

    this.rides[index] = ride;
  }
}
