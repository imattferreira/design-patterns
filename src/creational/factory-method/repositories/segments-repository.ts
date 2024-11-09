import Segment from "../entities/segment";

export default interface SegmentsRepository {
  save(segment: Segment): Promise<void>;
  listByRideId(rideId: string): Promise<Segment[]>;
}

export class SegmentsRepositoryInMemory implements SegmentsRepository {
  private segments: Segment[];

  constructor() {
    this.segments = [];
  }

  async listByRideId(rideId: string): Promise<Segment[]> {
    return this.segments.filter((segment) => segment.rideId === rideId);
  }

  async save(segment: Segment): Promise<void> {
    this.segments.push(segment);
  }
}
