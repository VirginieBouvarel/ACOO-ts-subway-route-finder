# Use case analysis

## Names (classes)
* Voyageur: acteur extérieur -> ne fait pas partie du système
* Système : ensemble du système lui-même -> n'a pas besoin d'être représenté DANS le système 
* Station -> **Station** class -> existe déjà
* Itinéraire: décision de conception -> sera représentée DANS le système par un ensemble de liaisons

Il va nous manquer une classe pour s'occuper de l'affichage de l'itinéraire (output)
* AfficheurDeMetro -> **SubwayPrinter** class

## Verbs (methodes)
* Donne une station -> fourni au système -> n'a pas besoin d'une méthode dédiée
* Vérifier une station -> **hasStation** -> existe déjà
* Calculer itinéraire -> **getDirections** 
* Afficher itinéraire -> **printDirections**