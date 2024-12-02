import Room from "../entities/room";

export default interface RoomsRepository {
  getAvailableRoomsByPeriodAndCategory(
    checkInDate: Date,
    checkOutDate: Date,
    category: string
  ): Promise<Room[]>;
}

export class RoomsRepositoryInMemory implements RoomsRepository {
  private stored: Room[];

  constructor() {
    this.stored = [
      // Room.create(1, "suite", 500, "available"),
      // Room.create(2, "suite", 500, "available"),
      // Room.create(3, "suite", 500, "available"),
      // Room.create(4, "suite", 500, "maintenance"),
    ];
  }

  async getAvailableRoomsByPeriodAndCategory(
    checkInDate: Date,
    checkOutDate: Date,
    category: string
  ): Promise<Room[]> {
    // TODO
    return this.stored.filter((room) => {
      const isInRage = "";

      return room.category === category;
    });
  }
}
