+++
title = "tutoriel silverstripe ep0 introduction"
date = "2015-06-30"
slug = "2015/06/30/tutoriel-silverstripe-ep0-introduction"
Categories = []
+++
## Qu’est-ce que Silverstripe ?

[Silverstripe](http://www.silverstripe.org) (ou SS par la suite, mais je ne ferai pas de mauvais jeux de mots...) est un CMS PHP open-source sous licence BSD d’origine néo-zélandaise.

Au départ, utilisé en interne par la [société](http://www.silverstripe.com) du même nom, il a été libéré aux alentours de 2005 pour la version 2. Nous en sommes aujourd’hui à la version 3.

Silverstripe n’est pas qu’un CMS, il est basé sur le framework PHP orienté objet du même nom. Avec la version 3.X, il est tout à fait possible d’utiliser Silverstripe (framework) pour des projets qui n’ont strictement rien à voir avec les fonctionnalités habituelles de gestion de contenu.

Bien entendu le _module CMS_ a été entièrement réalisé avec ce framework et peut donc être étendu à volonté.

## Pourquoi Silverstripe (en guise d’avertissement) ?

J’ai testé pas mal de CMS tout au long de mon parcours professionnel. Aujourd’hui je gagne ma vie principalement avec l’écosystème Drupal, mais je conserve toujours une _affection_ particulière pour ce petit CMS.

Le but de cette série n’est absolument pas de vous convaincre de la supériorité d’un CMS sur un autre. Ce sont des outils, s’ils conviennent à la tâche et si vous les maîtrisez, alors ce n’est sans doute pas la peine de regarder ailleurs.

Silverstripe ne fait pas partie du trio de tête des CMS mondiaux (Wordpress, Drupal, Joomla). Sa communauté (surtout dans cet hémisphère) n’a rien de comparable avec celle de Wordpress par exemple, le nombre d’extensions (modules) disponibles doit être cent fois moindre et cela se répercute aussi sur les articles et tutoriels disponibles.

Même si le site de l’Elysée tourne actuellement sous Silverstripe (de même que le site de campagne d’Obama en son temps et une bonne partie de l’administration néo-zélandaise), il n’a pas en France le même pouvoir prescripteur que Drupal aujourd’hui : inconnu au bataillon.

Si je commence cette série, c’est avant tout pour lui rendre un peu justice et pour vous exposer ses forces et ses faiblesses. 

Cela va mieux en le disant.

## Les avantages de Silverstripe

### Une interface utilisateur simple à prendre en main

![](http://userhelp.silverstripe.org//src/framework_3.1/docs/en/_images/Basic-Overview_2.jpg "Interface d'administration")

L’administration est centrée sur l’arborescence du contenu, je pense que c’est très bien pour les petits sites et une certaine catégorie de clients qui visualisent les choses par ce biais.

Mais l’on peut heureusement gérer une grande quantité de contenus par d’autres moyens si nécessaire.

On rajoute des pages et des sous-pages et pour chacune on peut choisir un style d’affichage (ou un type de contenu si vous préférez).

Mais on peut aussi créer des sections dans l’administration pour des _contenus_ qui ne seraient pas directement liés à l’arborescence.

Il y a beaucoup de fonctions et de _widgets_ pour faciliter l’insertion, le tri, le changement d’ordre (drag & drop) du contenu. La philosophie du CMS étant de fournir une interface homogène et unifiée pour ne pas perdre l’utilisateur.

Partant de cette base, tout peut être configuré pour fournir une interface d’administration agréable et unique pour chaque projet.

L’interface offre des options de Prévisualisation dans différents formats (tablettes, smartphones, desktop), c’est un petit plus agréable.

### Des outils de développement modernes

Silverstripe fait plutôt figure de bon élève dans la catégorie. Voici une liste non exhaustive :

- [Composer](https://getcomposer.org/) pour l’installation des modules et des dépendances. 
- Une implémentation assez stricte du modèle MVC, je ne dirais pas complète pour ne pas froisser les puristes.
- La majorité des valeurs de configuration sont stockées dans des fichiers et non en BDD, ce qui facilite grandement le _workflow_ entre plusieurs environnements (test, staging, prod°).
- Un développement vraiment orienté objet.
- Conséquence du MVC, le système de _templating_ est très indépendant du CMS lui-même.

### Un _framework_ robuste

Je n’ai pris le projet en route que depuis la version 2.X (lorsqu’il est devenu open-source). Ce qui est intéressant dans Silverstripe c’est que c’est à la fois un CMS et un Framework de développement PHP.

Depuis la version 3, il est tout à fait possible d’utiliser le second sans le premier. Le CMS étant une application particulière réalisée avec ce Framework.

Vous pouvez jeter un coup d’oeil à l’[API](http://api.silverstripe.org/3.2/) ici.

Pour la petite histoire, ce framework s’appelait _Sapphire_ au départ, hommage à peine caché à Ruby (et Ruby on Rails) des développeurs de la compagnie. Si vous connaissez un petit peu Rails, vous ne serez pas dépaysés :

- On décrit son modèle de données en PHP et la commande `dev/build` s’occupe de créer les bonnes tables dans la base, un peu comme on le ferait en Rails avec `db:migrate`.
- Le système de requêtes est très similaire (syntaxe propre à PHP mise à part) d’Active Record.
- etc.

## Et les inconvénients

### Faible notoriété et ressources disponibles

Je ne reviendrais pas sur la notoriété de SS en France. En 2013, il était évoqué dans le livre blanc de [Smile](http://www.open-source-guide.com/Solutions/Applications/Cms/Silverstripe) sur les CMS parmi les _outsiders_, je ne pense pas qu’il y soit encore dans la dernière version. Oui c’est injuste.

La communauté SS est très active en Océanie (Australie et Nouvelle-Zélande), continent d’origine du CMS. En Europe, c’est l’Autriche et le Royaume-uni qui comptent le plus de membres actifs et [d’évènements](http://www.meetup.com/SilverStripe-Europe-Meetup/). Mais cela est sans commune mesure avec l’activité autour de CMS plus connus, notamment Drupal que je connais bien et de sa très active communauté.

Quant aux ressources, je m’en plaignais déjà il y a fort longtemps dans un précédent [_post_](http://ludovic.coullet.net/quelques-commentaires-sur-silverstripe/). Mais les choses se sont bien améliorées, notamment la documentation officielle qui a rattrapé son retard.

Beaucoup d’efforts ont été faits récemment et je vous conseille chaudement la [série de tutoriels vidéo / texte](http://www.silverstripe.org/learn/lessons/) en anglais sur le site officiel. D’ailleurs, je ne vous cache pas que ce qui va suivre s’en inspirera forcément un peu.

### Ce n’est pas un CMS pour _site builders / webmasters_

Si vous connaissez un petit peu Drupal, vous aurez entendu parler des modules CCK et Views (aujourd’hui intégré au _Core_ ou en passe de l’être). Ils permettent d’étendre les fonctionnalités du CMS sans écrire une seule ligne de code pour rajouter des nouveaux types de contenu, faire des _pages listes_, etc. Les mêmes outils sont aussi disponibles pour Wordpress.

Rien de cela avec Silverstripe. Il faut ouvrir son éditeur / IDE favori pour rajouter un champ date ou image ou afficher les 3 derniers articles de blog en page d’accueil. Nous sommes donc très loin du _personna site builder_ tel qu’on le connait chez [Drupal](https://www.drupal.org/site-building) ou d’autres, qui passe son temps à modifier le site via le back-office.

J’exagère à peine car il y a quand même l’équivalent d’un module userform / contact7 qui permet à l’administrateur de créer des formulaires contact personnalisés. Mais ce genre d’exemples se comptent sur les doigts d’une main et ce n’est pas vraiment la philosophie de ce CMS.

Mais attention, je mentirai en vous disant que je suis un _véritable développeur_, et pourtant j’y arrive très bien. Il faut juste prendre un peu de temps pour apprivoiser le _Framework_ et pour des choses simples, cela va assez vite. D’ailleurs, je mentirai tout autant en vous disant qu’il ne faut pas être développeur pour maîtriser à 100% un module tel que Views sur Drupal. Que ce soit via une interface graphique ou du code, dans les 2 cas il faut quand même savoir de quoi on parle et ce qu’on veut réaliser (savoir ce que c’est qu’une relation…).

Il y a quand même certains avantages (à mon humble avis) à cette approche :

* Le back-office n’est pas _pollué_ par ces fonctionnalités et l’utilisateur final ne peut pas faire de bêtises…
* Pas d’interface, moins d’intermédiaires entre le _site builder_ et le code donc plus de performance à l’arrivée.

Néanmoins, si vous cherchez une pléthore de modules à installer, il faudra peut être trouver votre bonheur ailleurs…

## A mi-chemin entre framework et CMS

Je ne sais pas où mettre ce dernier point, est-ce un avantage ou bien un inconvénient ?

* Vous maîtrisez bien un CMS, mais parfois il faudrait s’éloigner de la gestion de contenu pure et dure pour les besoins métiers d’un client.
* De même tel framework PHP n’a plus de secrets pour vous, mais il ne lui manquerait qu’un bon CMS et vous n’avez pas le temps de re-développer la roue.

C’est là que les ennuis commencent, où comment faire cohabiter votre développement avec le CMS, mutualiser les ressources, assurer la sécurité et la stabilité de l’ensemble etc.

Vous me direz qu’on peut également faire beaucoup de choses avec les CMS les plus avancés disponibles, mais c’est parfois comme vouloir faire aboyer un chat, c’est possible.

Prêts pour la suite, alors rendez-vous next week…


