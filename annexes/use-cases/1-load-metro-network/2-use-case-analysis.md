# Names (classes)
* Administrateur : acteur extérieur -> ne fait pas partie du système
* Fichier : Input fourni au système -> n'a pas besoin d'être représenté DANS le système
* Système : ensemble du système lui-même -> n'a pas besoin d'être représenté DANS le système 
* Station -> **Station** class
* Métro -> **Subway** class
* Ligne : décision de conception -> sera représentée DANS le système par un ensemble de liaisons
* Liaisons -> **Connection** class

Il va manquer une classe pour gérer l'input.
Il nous faut une classe qui s'occupera de récupérer le fichier depuis l'extérieur du système pour le charger dans le système et délcencher la création d'un métro.
* Chargeur de métro -> **SubwayLoader** class

# Verbs (methodes)
* Charger un fichier -> **load**
* Lire un nom dans le fichier : opération inhérente au langage de programmation -> n'a pas besoin d'une méthode dédiée
* Ajouter une station -> **addStation**
* Vérifier une station -> **hasStation**
* Répéter : répétition des autres opérations -> n'a pas besoin d'une méthode dédiée
* Créer une liaison -> **addConnection**