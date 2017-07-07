+++
date = "2017-06-07"
draft = true
description = "Le but de cette série est de réaliser un petit programme utilisant Elm"
title = "Elm / Ep2 : The Elm Architecture"
tags = ["Elm", "Elm-lang"]
+++

Et me voilà en retard sur l'horaire. Désolé.

La [dernière fois](/elm-/-ep1--un-premier-programme-avec-elm/), nous avons réalisé une application à la pointe des dernières technologies... (il faut bien commencer quelque part)

C'était bien sympa d'écrire un peu d'HTML mais pour une langage qui se veut un remplaçant du JS, ça manque un petit peu d'intéractions...

## The Elm Architecture !

### Avant-propos

Sur cette partie, je n'invente pas la roue et il y a déjà énormément de ressources sur le sujet :

- [The Elm Architecture (doc officielle)](https://guide.elm-lang.org/architecture/)
- [Le fameux compteur](https://guide.elm-lang.org/architecture/user_input/buttons.html)
- Et pour les anglophobes

Reprenons notre fameux _fruitDisplayer_.

    main =
      div []
        [ h2 [] [ text "Fruits :" ]
        , ul [] (List.map fruitDisplayer fruits)
        ]

Jusque là nous intégrons la liste de fruits directement dans l'affichage. Mais nous pourrions tout aussi bien l'intégrer comme une variable dans une fonction.

    view: List fruit -> Html Msg
    view fruits =
