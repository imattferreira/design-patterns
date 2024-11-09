import Coord from "./coord";

// Value-Object (DDD)
export default class Location {
  coord: Coord;
  date: Date;

  constructor(lat: number, long: number, date: Date) {
    this.coord = new Coord(lat, long);
    this.date = date;
  }
}
