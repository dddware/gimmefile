# Gimmefile

Aplication de création d'url unique pour la réception de fichier.

## Installation

### Usage classique

```shell
$ git clone git@github.com:dddware/gimmefile.git
$ cd gimmefile
$ npm install
$ node app # ou npm start
```

### Avec supervisor

Il est recommandé d'utiliser supervisor qui va assurer le redémarrage du serveur Express lors de la modification des fichiers. Remplacez simplement la dernière étape par :

```shell
npm install -g supervisor
supervisor app.js
```

## TODO

- page de génération de l'url, on aura besoin de :
	- email de l'utilisateur, on lui envoi l'adresse de téléchargement des fichiers, et des mises à jour si besoin;
	- les adresse des récepteurs;
	- durée de validité du lien d'upload (2h/1h/1semaine/1mois);
	- mot de passe pour protéger les liens;
	- limiter le nombre de fichier uploadables;
- page d'upload de fichier, accessible par l'url unique;

