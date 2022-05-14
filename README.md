# Client pour la cartographie nationale de l’offre de médiation numérique

## À propos

Ce client permet l'affichage de la [cartographie nationale de l’offre de médiation numérique](https://d2pzn8br7bs1l.cloudfront.net/) dans un navigateur web, il est construit à partir des éléments présents dans la bibliothèque pour la cartographie de l’offre de médiation numérique.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)
- 📝 [Licence](#licence)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript
- [Yarn](https://yarnpkg.com/) : Gestionnaire de paquets pour les produits développés dans des environnements Node

> Node et Yarn peuvent être installés via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

Ce projet a été construit dans un espace de travail Angular, pour fonctionner correctement, il est nécessaire de le cloner dans l'environnement prévu à cet effet :

- Suivre la procédure d'installation du projet [Client Base](https://github.com/anct-cartographie-nationale/client-base)
- Puis cloner le dépôt en local dans le dossier `projects` : `git clone git@github.com:anct-cartographie-nationale/client-application.git`

## Utilisation

Ces commandes servent dans un contexte de développement de l'application et doivent être exécutées depuis la racine de l'espace de travail, c'est-à-dire depuis le dossier parent du dossier `projects`.

### Lancement

Exécuter `yarn start`, puis naviguer vers `http://localhost:4200/`.

### Construction

Exécuter `yarn build` pour construire le projet. Les fichiers de sortie sont écrits dans le dossier `dist/`.

### Test

Exécuter `yarn test` pour tester le projet.

### Lint

Exécuter `yarn lint` pour une analyse statique des fichiers `.ts` du projet.

### Prettier

Exécuter `yarn prettier` pour mettre à niveau la syntaxe de l'ensemble des fichiers du projet.

## Contribution

### Nommage des branches

- Une branche qui apporte une nouvelle fonctionnalité doit ête préfixé par `feature/` : `feature/ma-fonctionnalite`
- Une branche qui apporte une correction doit ête préfixé par `fix/` : `fix/ma-correction`

### Déployer

Lorsqu'une branche est fusionnée avec `main`, cela déclenche automatiquement la publication du build sur l'espace dédié à la production ainsi que l'invalidation du cache sur le CDN.

## Construit avec

### langages & Frameworks

- [TypeScript](https://www.typescriptlang.org/) est un langage open source construit à partir de JavaScript
- [Angular](https://angular.io/) est une boîte à outils open source pour construire des clients web

### Outils

#### CLI

- [Jest](https://jestjs.io/) est une boîte à outils pour écrire des tests automatisés en JavaScript
- [Eslint](https://eslint.org/) est un analyseur statique de JavaScript avec les plugins suivants :
- [Prettier](https://prettier.io/) est un magnificateur de code source en JavaScript

#### CI

- [Github Actions](https://docs.github.com/en/actions) est l'outil d'intégration et de déploiement continu intégré à GitHub
  - L'historique des déploiements est disponible [sous l'onglet Actions](https://github.com/anct-cartographie-nationale/client-application/actions/)
- Secrets du dépôt :
  - `AWS_ACCESS_KEY_ID` : Clé d'accès AWS du compte `cartographie-nationale.client.ci`
  - `AWS_SECRET_ACCESS_KEY` : Secret associé à la clé d'accès à AWS du compte `cartographie-nationale.client.ci`
  - `AWS_S3_BUCKET` : Identifiant de l'espace sur AWS S3 dans lequel est publié le build du projet pour un accès public
  - `AWS_CLOUDFRONT_DISTRIBUTION_ID` : Identifiant de la distribution CloudFront qui est le CDN par lequel le site est exposé sur internet

#### Déploiement

- L'infrastructure de déploiement est décrite avec Terraform dans les dépôts :
  - [Client Infrastructure](https://github.com/anct-cartographie-nationale/client-infrastructure)
  - [Network Infrastructure](https://github.com/anct-cartographie-nationale/network-infrastructure)
- [AWS](https://aws.amazon.com/) est la plateforme de services Cloud proposée par Amazon.
  - Compte de déploiement : `cartographie-nationale.client.ci`
  - Groupe : `publisher.client`
  - Environnement cible : https://d2pzn8br7bs1l.cloudfront.net/

## Licence

Voir le fichier [LICENSE.md](./LICENSE.md) du dépôt.
