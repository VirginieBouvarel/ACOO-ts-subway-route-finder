import { Writable } from "stream";
import { Connection } from "./Connection";

export class SubwayPrinter {
  private output: Writable;

  constructor(output: Writable) {
    this.output = output;
  }

  printDirections(route: Connection[]): void {
    let connection = route[0];
    let currentLine = connection.getLineName();
    let previousLine = currentLine;

    this.output.write(`Partez de ${connection.getStation1().getName()}.\n`);
    this.output.write(`Prenez la ${currentLine} en direction de ${connection.getStation2().getName()}.\n`);

    for (let i = 1; i < route.length; i++) {
      connection = route[i];
      currentLine = connection.getLineName();
      if (currentLine === previousLine) {
        this.output.write(`  Passez ${connection.getStation1().getName()}...\n`);
      } else {
        this.output.write(`Quand vous arrivez à ${connection.getStation1().getName()}, quittez la ${previousLine}.\n`);
        this.output.write(`Prenez la ${currentLine}, en direction de ${connection.getStation2().getName()}.\n`);
        previousLine = currentLine;
      }
      this.output.write(`Descendez à ${connection.getStation2().getName()} et passez une bonne journée!\n`);
    }
  }
}