import { Connection } from "./Connection";
import { Station } from "./Station";

export class Subway {
  private stations: Station[];
  private connections: Connection[];
  private network: Map<Station, Station[]>;

  constructor() {
    this.stations = [];
    this.connections = [];
    this.network = new Map();
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

      this.addToNetwork(stationOne, stationTwo);
      this.addToNetwork(stationTwo, stationOne);
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

  private getConnection(station1: Station, station2: Station): Connection | null {
    for (let i = 0; i < this.connections.length; i++) {
      const connection = this.connections[i];
      const stationOne = connection.getStation1();
      const stationTwo = connection.getStation2();
      if (station1.equals(stationOne) && station2.equals(stationTwo)) {
        return connection;
      }
    }
    return null;
  }

  /**
   * On vérifie si la station 1 est présente dans le réseau,
   * Si Oui, on récupère la liste des stations qui lui sont reliées
   * * On vérifie si station2 est incluse dans cette liste
   * * Si ce n'est pas le cas on l'y ajoute,
   * * Puis on modifie la valeur de station1 dans le réseau 
   * * en lui passant la nouvelle liste de stations liées incluant station2
   * Si Non, on crée une liste vide de stations liées
   * * On y ajoute station2
   * * Et on crée une entrée dans le réseau pour station1 
   * * en lui attribuant la liste contenant station 2
   */
  private addToNetwork(station1: Station, station2: Station) :void {
    if(this.network.has(station1)) {
      const connectingStations = this.network.get(station1) as Station[];
      if (!connectingStations.includes(station2)) {
        connectingStations!.push(station2);
        this.network.set(station1, connectingStations);
      }
    } else {
      const connectingStations: Station[] = [];
      connectingStations.push(station2);
      this.network.set(station1, connectingStations);
    }
  }

  getDirections(startStationName: string, endStationName: string): Connection[] {
    if (!this.hasStation(startStationName) || !this.hasStation(endStationName)) {
      throw new Error("Les stations saisies n'existent pas dans ce métro.");
    }

    /**
     * Algorithme de Dijkstra tout prêt 
     * fourni dans le livre et à inclure tel quel ici
     */
    const start = new Station(startStationName);
    const end = new Station(endStationName);
    const route: Connection[] = [];
    const reachableStations: Station[] = [];
    const previousStations: Map<Station, Station> = new Map();

    const neighbors = this.network.get(start) || [];

    for (const station of neighbors) {
      if (station.equals(end)) {
        route.push(this.getConnection(start, end) as Connection);
        return route;
      } else {
        reachableStations.push(station);
        previousStations.set(station, start);
      }
    }

    let nextStations = [...neighbors];
    let currentStation: Station = start;

    searchLoop: for (let i = 1; i < this.stations.length; i++) {
      const tmpNextStations: Station[] = [];
      for (const station of nextStations) {
        reachableStations.push(station);
        currentStation = station;
        const currentNeighbors = this.network.get(currentStation) || [];
        for (const neighbor of currentNeighbors) {
          if (neighbor.equals(end)) {
            reachableStations.push(neighbor);
            previousStations.set(neighbor, currentStation);
            break searchLoop;
          } else if (!reachableStations.includes(neighbor)) {
            reachableStations.push(neighbor);
            tmpNextStations.push(neighbor);
            previousStations.set(neighbor, currentStation);
          }
        }
      }
      nextStations = tmpNextStations;
    }

    // Nous avons trouvé le chemin
    let keepLooping = true;
    let keyStation: Station = end;

    while (keepLooping) {
      const station = previousStations.get(keyStation)!;
      route.unshift(this.getConnection(station, keyStation) as Connection);
      if (start.equals(station)) {
        keepLooping = false;
      }
      keyStation = station;
    }

    return route;
  }
}
