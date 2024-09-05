export class Station {
  private name: string;

  constructor( name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  equals(obj: {}) : boolean {
    if (obj instanceof Station) {
      const otherStation = obj as Station;
      return otherStation.getName().toLowerCase() === this.name.toLowerCase();
    }
    return false;
  }
}