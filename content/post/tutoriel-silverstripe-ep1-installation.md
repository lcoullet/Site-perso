+++
title = "tutoriel silverstripe ep1 installation"
date = "2015-07-07"
slug = "2015/07/07/tutoriel-silverstripe-ep1-installation"
Categories = []
+++

## Note de service

Cette série de tutoriels (qui je l’espère va être longue et constituer un tout autonome (priez pour moi)) abordera beaucoup d’aspects du développement de sites webs :

* Développement _back_ : PHP…
* Développement _front_ : HTML, CSS, JS…
* Un soupçon de design et d’ergonomie
* Un nuage de gestion de projet
* Une larme d’administration système

Je ne prétends pas être un _crack_ dans chacun des domaines ci-dessus.

Sans doute, les experts de chaque secteur trouveront beaucoup à redire sur chaque sujet pris indépendamment. Soyez indulgents et n’hésitez pas à me faire part de vos améliorations et critiques.

Si par chance vous êtes expert en tout, veuillez m’excuser et pour les autres j’espère vous apporter le minimum nécessaire pour réaliser votre propre site avec SilverStripe.

## Pré-requis (vous pouvez passer, quoique…)

Vous aurez besoin d’installer et de configurer certaines choses pour suivre cette série :

* Apache
* PHP (5.3+ c’est bien)
* MySQL

Vous aurez également besoin d’un navigateur récent, d’un éditeur de code et d’un client FTP.

Le plus simple est d’utiliser une solution toute faite comme [WAMP](http://www.wampserver.com/) (pour windows), [MAMP](https://www.mamp.info/en/) (pour mac) ou [XAMP](https://www.apachefriends.org/fr/index.html) (multi-plateformes) qui _encapsulent_ ce qu’il faut pour faire tourner une application Web PHP dans un espace clos et pré-configuré. C’est pratique pour ne pas interférer avec le reste de votre configuration.

Vous pouvez aussi faire tout cela à la main comme un grand, mais dans ce cas vous n’avez très certainement pas besoin de mon aide.

Etant sous Mac OSX, j’utilise MAMP avec [Atom](https://atom.io/) comme éditeur. Mais WAMP avec [Sublime](https://www.sublimetext.com/), [Notepad++](https://notepad-plus-plus.org/fr/) ou le récent [Visual Code Studio](https://code.visualstudio.com/) de chez Microsoft feront aussi bien l’affaire. Et si vous préférez l’artillerie lourde (Eclipse, Netbeans, et soyons fous  Dreamweaver) ça n’est pas un problème non plus.

La plupart des éditeurs ci-dessus disposent d’extensions (coloration syntaxique, auto-complétion) spécifiques pour SilverStripe afin de vous faciliter un peu la vie.

Quelques liens : 

- [https://atom.io/packages/silverstripe-bundle](https://atom.io/packages/silverstripe-bundle)
- [https://github.com/benjamin-smith/sublime-text-silverstripe](https://github.com/benjamin-smith/sublime-text-silverstripe)
- [https://github.com/plucfortin/silverstripe-fingertext](https://github.com/plucfortin/silverstripe-fingertext)


L’usage de la ligne de commande n’est pas obligatoire, mais facilite beaucoup de choses. Ça ne mord pas, n’ayez pas peur d’ouvrir un terminal.

Il parait que SilverStripe tourne très bien sous serveurs windows (IIS), ou encore avec Postgresql, Nginx etc. Pour cette série de tutoriels, je vais faire simple et standard : Apache et MySQL.

## Installation

### Création d’une base de données

SilverStripe nécessite une base de données pour fonctionner donc la première étape est d’utiliser _PhpMyAdmin_ ou équivalent pour créer une base dont vous noterez bien le nom et les accès.

### Récupération des fichiers

Il s’agit maintenant de récupérer le code proprement dit. Il existe 2 façons de faire.

#### La manière _bien_

Directe, franche du collier : faites un petit tour sur [silverstripe.org/software/download/](https://www.silverstripe.org/software/download/), téléchargez l’archive Zip de la dernière version pour la décompresser à la racine de votre  installation (répertoire `htdocs/`ou `/var/www/`).

#### La manière _mieux_ : Composer !

[Composer](https://getcomposer.org/) est un gestionnaire de dépendances, l’équivalent de `npm` pour node.js ou de `bundler` pour ruby.

Un fichier `composer.json` à la racine de votre installation décrit les librairies et les modules nécessaires à votre projet. En ce qui nous concerne, cela peut-être une installation de SilverStripe et éventuellement des modules associés.

Il suffit alors de lancer la commande `composer update` et composer ira télécharger pour vous les bonnes versions sur les différents dépôts git (ou autre) des projets.

Exemple d’un fichier `composer.json` :

	{
	"name": "silverstripe/installer",
	"description": "The SilverStripe Framework Installer",
	"require": {
		"php": ">=5.3.2",
		"silverstripe/cms": "3.1.13",
		"silverstripe/framework": "3.1.13",
		"silverstripe-themes/simple": "*"
	},
	"require-dev": {
		"phpunit/PHPUnit": "~3.7@stable"
	},
	"config": {
		"process-timeout": 600
	},
		"minimum-stability": "dev"
	}

Mais il n’est pas nécessaire d’éditer un fichier aussi complexe pour commencer. La commande suivante :

`composer create-project silverstripe/installer`

installera la dernière version stable du CMS dans le répertoire en cours.

L’avantage de cette méthode est qu’il est plus facile de mettre à jour le CMS grâce à un petit `composer update`.

Pour installer Composer, merci de vous référer à sa [documentation](https://getcomposer.org/doc/00-intro.md).

Si vous êtes sous OSX et utilisez MAMP, voici comment faire en sorte que Composer s’exécute bien sous MAMP et pas dans la version de PHP fournie avec le système :

	nano ~/.bash_profile
	
insérer
	
	alias phpmamp='/Applications/MAMP/bin/php/php5.4.10/bin/php'
	
relancer le terminal
	
	curl -sS https://getcomposer.org/installer | phpmamp
	
	sudo mv composer.phar /usr/local/bin/composer
	
	composer

### Installation

Quelle que soit la méthode d’installation des fichiers, vous devez vous retrouver avec un répertoire « silverstripe ».

Le reste de l’installation est très classique.

Lancez Wamp, Mamp etc. Et rendez-vous (dans le cas de MAMP) à l’adresse suivante : `http://localhost:8888/silverstripe/install.php` si silverstripe est le nom de votre répertoire.

Pas la peine de rentrer dans les détails si vous avez déjà installé un Wordpress ou un Drupal, etc.

Vous pouvez choisir le français comme langue d’installation !

> Nous voilà débarrassés du superflu, nous pouvons passer à l’essentiel !

G. DEPARDIEU - Tenue de Soirée.

Amusez-vous bien avec le back-office et l’insertion de contenu, à la semaine prochaine pour entrer enfin dans le vif du sujet !
