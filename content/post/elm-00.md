+++
date = "2017-06-06"
description = "Le but de cette série est de réaliser un petit programme utilisant Elm"
title = "Elm / Ep0 : introduction"
categories = ["Elm", "Elm-lang"]
+++

Le but de cette série est de réaliser un petit programme en utilisant Elm pour gérer l’affichage (_frontend_).

## Qu’est-ce que Elm ?

> [Elm](http://elm-lang.org/) est un langage de programmation **fonctionnel** qui permet de créer des interfaces graphiques pour le web ainsi que des jeux. Il **compile le code en JavaScript**.

-- Source : [Wikipedia](https://fr.wikipedia.org/wiki/Elm_(langage))

Elm est un [langage fonctionnel](https://fr.wikipedia.org/wiki/Programmation_fonctionnelle) comme [OCaml](https://fr.wikipedia.org/wiki/OCaml), [F\#](https://fr.wikipedia.org/wiki/F_sharp), [Haskell](https://fr.wikipedia.org/wiki/Haskell), [Elixir](https://fr.wikipedia.org/wiki/Elixir_(langage)), [Scala](https://fr.wikipedia.org/wiki/Scala_(langage)), [Clojure](https://fr.wikipedia.org/wiki/Clojure), etc. Sa syntaxe et ses concepts sont donc très différents des [langages impératifs](https://fr.wikipedia.org/wiki/Programmation_imp%C3%A9rative) comme le JavaScript et des dérivés comme TypeScript ou PureScript.

Cependant et c’est la deuxième partie de la description, tout programme Elm peut-être compilé en Js et donc être utilisé partout où ce dernier peut l’être.

Il dispose également de fonctionnalités qui lui permettent de communiquer avec du code javascript pré-existant.

## Pourquoi Elm ?

Pour faire son malin bien sûr ! Plus sérieusement, voici quelques (bonne et mauvaises) raisons :

- Apprendre un nouveau langage, qui plus est fonctionnel et s’enrichir d’autres manières de faire
- Profiter d’un compilateur souvent décrit comme un modèle du genre avec des messages d’erreurs, clairs, précis et qui la plupart du temps vous guident vers une solution
- [Elm est rapide](http://elm-lang.org/blog/blazing-fast-html-round-two), plus rapide que React, Angular et Vue à cet instant.
- Pour éviter au maximum les _runtime errors_, les _undefined is not a function_, les _null_, et le _callback hell_. Si vous faites un peu de Js, cela devrait vous parler. Tout ceci n’existe pas, ne peut pas exister avec Elm.

## Le programme

Les langages fonctionnels sont une nouveauté pour moi. Ils sont souvent considérés comme la _chasse gardée_ des universitaires ou des théoriciens de l’informatique avec des concepts barbares comme l’immutabilité, la pureté, les monades, le _curry-ing_ et j’en passe.

Je ne vais pas m’improviser spécialiste du domaine (la supercherie se verrait bien vite). J’essaierai donc au maximum d’introduire ces concepts au fur et à mesure, lorsque nécessaire et sur des cas concrets en vous disant ce que j’en ai compris. N’hésitez pas à me corriger et ne vous laissez pas impressionner. Ici, la plus grande qualité sera de savoir _dés-apprendre_ ce que nous savons déjà.

Nous partons du principe :

* Que vous connaissez un peu d’HTML et de CSS et assez de JS pour installer une librairie
* Que vous êtes un peu fous

La suite est [ici](/elm-/-ep1--un-premier-programme-avec-elm/).