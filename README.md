# marvelProjectJS

### Project setup
```
yarn install
```

### Compiles et hot-reloads pour le development
```
yarn serve
```

### Compiles et minifies pour la production
```
yarn build
```
### Utilisation de l'api marvel
Pour utiliser l'api dans l'application il existe la méthode get(options) du fichier
utils/api.js
options est un objet contenant à minima l'endpoint et pour rajouter des paramètre sur la route choisi
il suffit de rajouter son paramètre et la valeur dans l'objet. 

Exemple:
```
const options = {
    limit: 1,
    nameStartWith: "unString",
    endpoint: "characters" //pour la route /characters
}
```
le résulat sera urlApiMarvel/characters?apikey=apikey&limite=1&nameStartWith=unString
### Dispositon des composants et leurs utilisations
L'application est composé d'un composant principal qui est marvelApp (situé dans src/components/marvelApp/)
Ce composant est subdivisé en 3 parties :
- Search qui s'occupe de la recherche et des appels api de la recherche
- ShowResult qui s'occupe d'afficher le résultat et les détails des personnages
- TeamBuilder qui s'occupe de créer, supprimer, sauvegarder et charger une équipe
