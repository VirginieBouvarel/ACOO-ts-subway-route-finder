import { Station } from "./Station";

export class Connection {
  private station1: Station;
  private station2: Station;
  private lineName: string;

  constructor(station1: Station, station2: Station, lineName: string) {
    this.station1 = station1;
    this.station2 = station2;
    this.lineName = lineName;
  }

  getStation1(): Station {
    return this.station1;
  }

  getStation2(): Station {
    return this.station2;
  }

  getLineName(): string {
    return this.lineName;
  }
}