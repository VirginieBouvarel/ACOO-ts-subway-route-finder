import fs from 'fs';
import { Subway } from "./Subway";

export class SubwayLoader {
  private subway: Subway;

  constructor() {
    this.subway = new Subway();
  }

  public async loadFromFile(subwayFile: string): Promise<Subway> {
      const stream = fs.createReadStream(subwayFile, { encoding: 'utf-8' });
      const lines = this.readLinesFromStream(stream);

      await this.loadStations(lines);
      let lineName = await this.readLine(lines);
      while (lineName && lineName.length > 0) {
          await this.loadLine(lines, lineName);
          lineName = await this.readLine(lines);
      }
      console.log(this.subway);
      return this.subway;
  }

  private async loadStations(lines: AsyncGenerator<string>): Promise<void> {
    let currentLine = await this.readLine(lines);
    while (currentLine && currentLine.length > 0) {
        this.subway.addStation(currentLine);
        currentLine = await this.readLine(lines);
    }
  }

  private async loadLine(lines: AsyncGenerator<string>, lineName: string): Promise<void> {
    let station1Name = await this.readLine(lines);
    let station2Name = await this.readLine(lines);
    while (station2Name && station2Name.length > 0) {
        this.subway.addConnection(station1Name, station2Name, lineName);
        station1Name = station2Name;
        station2Name = await this.readLine(lines);
    }
  }

  private async readLine(lines: AsyncGenerator<string>): Promise<string> {
    const { value, done } = await lines.next();
    return done ? '' : value;
  }

  private async *readLinesFromStream(stream: NodeJS.ReadableStream): AsyncGenerator<string> {
    let buffer = '';

    for await (const chunk of stream) {
      buffer += chunk;
      let lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        yield line.trim();
      }
    }

    if (buffer.length > 0) {
      yield buffer.trim();
    }
  }
}