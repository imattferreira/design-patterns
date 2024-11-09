import RidesRepository from "../repositories/rides-repository";
import SegmentsRepository from "../repositories/segments-repository";

interface Input {
  rideId: string;
}

interface Output {
  fare: number;
}

export default class CalculateFare {
  constructor(
    readonly ridesRepository: RidesRepository,
    readonly segmentsRepository: SegmentsRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.ridesRepository.getById(input.rideId);
    const segments = await this.segmentsRepository.listByRideId(input.rideId);

    const fare = ride.calculateFare(segments);

    return { fare };
  }
}
