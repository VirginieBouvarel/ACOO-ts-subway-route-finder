import { SubwayLoader } from "../SubwayLoader";
import { SubwayPrinter } from "../SubwayPrinter";

export class SubwayTester {
  async main(args : string[]): Promise<void> {
    if (args.length != 2) {
      console.error("Usage: Test métro - Affichage Itinéraire : [StartStation] - [endStation]");
      return;
    }

    try {
      const loader = new SubwayLoader();
      const objectVille = await loader.loadFromFile('./network.txt');

      if (!objectVille.hasStation(args[0])) {
        console.log(`${args[0]} n'est pas une station d'objectVille.`);
        return;
      } else if(!objectVille.hasStation(args[1])) {
        console.log(`${args[1]} n'est pas une station d'objectVille.`);
        return;
      }

      const route = objectVille.getDirections(args[0], args[1]);
      const printer = new SubwayPrinter(process.stdout);
      printer.printDirections(route);
    } catch(error) {
      console.log(error);
    }
  }
}