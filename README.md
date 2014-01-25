# Gimmefile

Application de création d'url unique pour la réception de fichier.

## Installation

### Usage classique

```shell
$ git clone git@github.com:dddware/gimmefile.git
$ cd gimmefile
$ npm install
$ node server
```

### Avec supervisor

Il est recommandé d'utiliser supervisor qui va assurer le redémarrage du serveur Express lors de la modification des fichiers.

```shell
npm install -g supervisor
npm start
```

## Gulp

- Lancez `gulp` pour déclencher la génération des assets, le watch sur les assets et les vues, et l'ouverture du navigateur avec livereload.
- Lancez `gulp --production` pour obtenir des assets minifiés prêts pour la mise en production.

## TODO

- page de génération de l'url, on aura besoin de :
	- email de l'utilisateur, on lui envoi l'adresse de téléchargement des fichiers, et des mises à jour si besoin;
	- les adresse des récepteurs;
	- durée de validité du lien d'upload (2h/1h/1semaine/1mois);
	- mot de passe pour protéger les liens;
	- limiter le nombre de fichier uploadables;
- page d'upload de fichier, accessible par l'url unique;

- meilleure répartition des middlewares (notamment la gestion des messages flash) entre serveur et app (voire mise en place de module(s) dédié(s) ?)
- utiliser ça : https://github.com/LearnBoost/express-mongoose au lieu du bricolage maison ?
- utiliser ça absolument : https://github.com/danialfarid/angular-file-upload