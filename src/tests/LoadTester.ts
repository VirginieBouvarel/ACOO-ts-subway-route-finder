import { SubwayLoader } from "../SubwayLoader";

export class LoadTester {
  async main(): Promise<void> {
    try {
      const loader = new SubwayLoader();

      const objectVille = await loader.loadFromFile('./network.txt');

      console.log('Usage: Test métro - chargement du réseau');
      console.log('Test des stations...');
      if (
        objectVille.hasStation("Allée de Non duplication") &&
        objectVille.hasStation("Station Météo") &&
        objectVille.hasStation("Les planches à gogo")
      ) {
        console.log('...Test des stations réussi.');
      } else {
        console.log('...Test des stations échoué.');
      }

      console.log('\nTest des liaisons...');
      if (
        objectVille.hasConnection("Allée de Non duplication", "Théâtre Tête la première", "Ligne Meyer") &&
        objectVille.hasConnection("Station Météo", "Rocade XHTML", "Ligne Wirfs-Brock") &&
        objectVille.hasConnection("Théâtre Tête la première", "Cercle Infini", "Ligne Rumbaugh")
      ) {
        console.log('...Test des liaisons réussi.');
      } else {
        console.log('...Test des liaisons échoué');
        console.log(objectVille);

      }
    } catch(error) {
      console.log(error);
    }
  }
}