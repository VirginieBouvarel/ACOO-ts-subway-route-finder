// import { LoadTester } from "./tests/LoadTester";
import { SubwayTester } from "./tests/SubwayTester";

// const loadTester = new LoadTester();
// loadTester.main();

const startStation = "Rapides d'Ajax";
const endStation = "Cercle Infini";

const subwayTester = new SubwayTester();
subwayTester.main([startStation, endStation]);