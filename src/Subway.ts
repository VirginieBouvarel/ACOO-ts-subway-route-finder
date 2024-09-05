import { Connection } from "./Connection";
import { Station } from "./Station";

export class Subway {
  private stations: Station[];
  private connections: Connection[];

  constructor() {
    this.stations = [];
    this.connections = [];
  }

  addStation(stationName: string): void {
    if (!this.hasStation(stationName)) {
      const station = new Station(stationName);
      this.stations.push(station);
    }
  }

  hasStation(stationName: string): boolean {
    return !!this.stations.find((station) => station.getName() === stationName);
  }

  addConnection(stationName1: string, stationName2: string, lineName: string):void {
    if (this.hasStation(stationName1) && this.hasStation(stationName2)) {
      const stationOne = new Station(stationName1);
      const stationTwo = new Station(stationName2);

      const connection = new Connection(stationOne, stationTwo, lineName);
      const reversedConnection = new Connection(stationTwo, stationOne, lineName);

      this.connections.push(connection);
      this.connections.push(reversedConnection);
    } else {
      throw new Error("Liaison invalide !")
    }
  }

  hasConnection(stationName1: string, stationName2: string, lineName: string): boolean {
    const stationOne = new Station(stationName1);
    const stationTwo = new Station(stationName2);

    for (let i = 0; i < this.connections.length; i++) {
      const connection = this.connections[i];
      if (connection.getLineName().toLowerCase() === lineName.toLowerCase()) {
        if (connection.getStation1().equals(stationOne) && 
        connection.getStation2().equals(stationTwo)) {
          return true;
        }
      }
    }
    return false;
  }
}