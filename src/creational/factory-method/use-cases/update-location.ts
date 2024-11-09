import Location from "../entities/location";
import RidesRepository from "../repositories/rides-repository";
import SegmentsRepository from "../repositories/segments-repository";

interface Input {
  rideId: string;
  lat: number;
  long: number;
  date: Date;
}

export default class UpdateLocation {
  constructor(
    readonly ridesRepository: RidesRepository,
    readonly segmentsRepository: SegmentsRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.ridesRepository.getById(input.rideId);
    const newLocation = new Location(input.lat, input.long, input.date);
    const segment = ride.createSegment(ride.lastLocation, newLocation);

    await this.ridesRepository.update(ride);
    await this.segmentsRepository.save(segment);
  }
}
