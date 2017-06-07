+++
date = "2017-06-08"
draft = true
description = "Le but de cette série est de réaliser un petit programme utilisant Elm"
title = "Elm / Ep1 : Un premier programme avec Elm"
categories = ["Elm", "Elm-lang"]
+++

Et c’est parti !

Pour ce premier programme, inutile d’installer Elm sur sa machine. Vous pouvez vous rendre sur [Ellie](https://ellie-app.com/new) et commencer directement à tester.

Ellie c’est un peu le [codepen.io](http://codepen.io/) du Elm. C’est un bac à sable dans lequel vous pouvez écrire et tester du Elm sans avoir besoin d’installer quoi que ce soit.

L’application est divisée en 3 parties :

- Le code Elm
- Le code HTML
- et une fenêtre de rendu pour apprécier le résultat

Copiez-coller le code suivant dans la fenêtre « Elm » et cliquez sur compile !


    module Main exposing (..)
    import Html exposing (text, h1, div)
	
    main =
      div []
        [ h1 [] [ text "Elm" ]
        , text "mon premier programme."
        ]

Voilà vous pouvez rajouter Elm à votre CV !

**Quelques explications**

Tout fichier .elm doit commencer par une déclaration de module

    module Main exposing (..)

Ici notre module s’appelle `Main` et c’est par ce nom qu’il est appelé dans le fichier Html plus bas : `var app = Elm.Main.fullscreen()`.

`exposing (..)` indique que ce module _expose_ toutes ces fonctions à l’extérieur `(..)`. Cela peut-être un moyen de recréer ce qui dans d’autres langages s’appellent des fonctions privées.

    import Html exposing (text, h1, div)

Nous avons besoin d’afficher du HTML, donc il nous faut importer le module correspondant.

A la différence de la déclaration de notre module, nous avons choisi explicitement de n’importer que certaines fonctions comme celles permettant d’afficher du texte, un titre et une div.

Nous aurions pu simplement écrire `import Html` mais cela nous aurait obligé à les appeler de manière plus longue. Par exemple `Html.text` au lieu de `text`.

Import permet également de renommer à notre convenance ces appels de fonctions pour éviter les problèmes de _namespace_. Par exemple `import Html as Foo`, et dans ce cas, nous aurions pu écrire `Foo.text`.

## Tout est fonction !

Elm est un langage fonctionnel, nous ne vous avons pas pris en traitres.

Par convention la première fonction qui est appelée à l’exécution du programme est `main`.

    main =

## Première déception : où est passé mon Html ???

    main =
      div []
        [ h1 [] [ text "Elm" ]
        , text "mon premier programme."
        ]

La fonction `main` appelle tout de suite une autre fonction `div`.

`div` prend 2 arguments qui sont 2 listes (pour le moment comme elles s’écrivent [ ], on peut les rapprocher des _arrays_ en js mais c’est faux). Dans la première on pourra mettre tous les attributs Html nécessaires comme un id, class. La seconde c’est tout simplement le contenu de cette div.

Et ce contenu contient lui même d’autres fonctions comme h1 qui prend elle aussi 2 arguments et text qui n’en prend qu’un (une chaine de caractères). Les 2 fonctions text et h1 étant les éléments d’une même liste, elles sont séparées par une « , ».

Vous avez envie de partir ? Un peu de courage, ce n’est pas la première fois qu’on vous propose une manière différente d’écrire du HTML et vous verrez cela offre pas mal d’avantages.

- Ce sont des fonctions, elles sont exécutées comme telles, manipulées dans tout le sens et au final, on a un nouveau [DOM](https://fr.wikipedia.org/wiki/Document_Object_Model) que Elm se charge lui même de modifier sur le navigateur en ne touchant que ce qui a changé. ReactJs fait la même chose.
- Tout cela n’étant que des fonctions, vous pouvez faire les votre à l’envie.

### Une première fonction

Rajouter un peu plus bas (ou un peu plus haut, ça n’a pas d’importance).

    add x y =
      x + y

Nous venons de définir une première fonction `add` qui prend 2 arguments. Pas besoins de parenthèses ici, mais on peut les utiliser si besoin pour imbriquer une fonction dans une autre comme `add (add 3 2) 2`...

Notez qu’en Elm, toute fonction retourne forcément une valeur. Les fonctions ici sont dites **pures** car elles ne peuvent manipuler que les paramètres que vous leurs avez fournies.

Elles ne peuvent pas communiquer avec l’extérieur ou être influencées par ce dernier. Si vous lancez 10 000 fois la fonction add avec les mêmes paramètres, vous obtiendrez le même résultat, quelles que soient d’autres variables du programme, l’heure, le serveur sur lequel elles sont lancées, etc.

Si vous écrivez des tests fonctionnels pour votre programme Elm, ce n’est pas la peine de s’embêter à charger au préalable un contexte, un environnement, un état, il n’y en a pas ! C’est l’avantage de la _pureté_ (purity). Cela a aussi des inconvénients que nous verrons plus loin.

Utilisons cette fonction. Modifiez la fonction `main` comme suit :


    main =
      div []
        [ h1 [] [ text "Elm" ]
        , text "mon premier programme."
        , text (add 3 4)
        ]

    add x y =
      x + y

et cliquez sur _compile_.

## Not your average compiler

Oh oh nous avons une erreur, mais pas n’importe quelle erreur.

    TYPE MISMATCH
    LINE 10 COLUMN 11
    The argument to function text is causing a mismatch.
    Function text is expecting the argument to be:
      
    String
      
    But it is:
      
    number

Et oui ! La fonction `text` attend une chaine de caractères mais nous lui avons fourni un nombre. Ca ne peut pas marcher.

[Cherchons](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Basics#toString) une fonction qui permette d’effectuer cette transformation. `toString` devrait faire l’affaire !

    text (toString(add 3 4))

Compilons et cela marche nous affichons bien 7.

## Le _pipe operator_

Mais `text (toString(add 3 4))` ça commence à faire beaucoup de parenthèses et c’est peu lisible.

Elm offre une autre manière d’écrire la même chose pour préserver vos yeux et votre santé mentale :

    (add 3 4) |> toString |> text

Un peu comme le « | » de votre terminal unix, « |\> » permet de fournir le résultat d’une fonction comme paramètre de la suivante.

D’ailleurs nous aurions pu pousser le vice un peu plus loin et écrire :

    4 |> add 3 |> toString |> text

4 étant ainsi retourné comme paramètre de la fonction `add 3` car c’est bien d’une fonction dont il s’agit. Une fonction _appliquée partiellement_ qui attend son paramètre manquant. Cette technique aussi appelée [_currying_](https://fr.wikipedia.org/wiki/Curryfication) est fréquemment utilisée en Elm et dans tous les autres langages fonctionnels.

Ici c’est tout de suite plus lisible !

- On prend 4
- On lui ajoute 3
- On le transforme en texte
- On l’affiche en HTML

Le _pipe operator_ marche aussi dans l’autre sens :

    text <| toString <| add 3 <| 4

Cela peut avoir son intérêt dans certains cas, mais n’en abusez pas.

## Mais où est passé mon for in ?

Admettons que nous devions afficher une liste à puces de ce genre :

- Pommes
- Bananes
- Cerises
- Poires

Nous pourrions écrire le programme suivant :

    module Main exposing (..)
    
    import Html exposing (text, h2, ul, li, div)
    
    main =
      div []
        [ h2 [] [ text "Fruits :" ]
        , ul []
          [ li [] [ text "Pommes" ]
          , li [] [ text "Bananes"]
          , li [] [ text "Cerises"]
          , li [] [ text "Poires"]
          ]
        ]

PS : Vous n’êtes pas obligés de présenter les choses aussi bien, mais une petit clic sur « format » et vous aurez la même chose.

Cela marche mais c’est un peu long à écrire, répétitif et surtout cela promet d’être fastidieux si la liste s’allonge.

On pourrait écrire un petit programme qui prenne une liste de fruits en paramètre et écrive à notre place cette suite de `li`...

Un petit _for each_ devrait faire l’affaire, mais ce serait trop simple car il n’y en pas.

Comment faire ?

## Higher order functions

Reprenons au début, nous souhaitons partir d’une liste de fruits  comme `["pommes","bananes","poires"]` et obtenir pour chacune une sortie de ce type : `li [ ] [ text "fruit"]`. Il nous faut donc une fonction qui prenne comme arguments :

- une fonction qui transforme a en b
- une liste de a

pour avoir au final une liste de b.

C’est exactement ce que propose `List.map` : [http://package.elm-lang.org/packages/elm-lang/core/5.1.1/List#map](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/List#map)

    map : (a -> b) -> List a -> List b
    Apply a function to every element of a list.
      
    map sqrt [1,4,9] == [1,2,3]
      
    map not [True,False,True] == [False,True,False]

Ce genre de fonctions qui prennent une fonction comme argument et qui transforment une liste en une autre sont appelées _higher order functions_ ou [fonctions d’ordre supérieur](https://fr.wikipedia.org/wiki/Fonction_d%27ordre_sup%C3%A9rieur).

Dans l’exemple de la documentation `sqrt` renvoie la racine carrée. Sa signature est `sqrt : Float -> Float`, c’est à dire qu’elle prend un float (nombre à virgule) comme paramètre et retourne un float. Nous y reviendrons.

Ecrivons une fonction qui prenne un fruit (une chaine de caractère) et renvoie un li !

    fruitDisplayer fruit =
      li [ ] [ text fruit ]

PS : les fonctions commencent par une minuscule.

Définissions une liste de fruits

    fruits = ["pommes","bananes","poires"]

Il s’agit d’une liste et pas d’un _array_. Les listes sont les collections de base en Elm contrairement au Js. On peut facilement et rapidement sur une liste, mais on ne peut y accéder simplement en donnant l’ordre d’un élément dans une liste `fruit[0]` par exemple. Rassurez-vous, les arrays existent aussi en Elm, mais on ne les utilise pas aussi couramment.

Notez aussi qu’une liste ne peut contenir qu’un seul type d’éléments, des entiers, des nombres, des chaines de caractères, d’autres listes, etc. Mais pas de mélanges.

Il ne nous reste plus qu’à appeler notre fonction map.

    List.map fruitDisplayer fruits

La librairie List est incluse dans le _core_ de Elm mais il convient de l’appeler par son petit nom car il existe d’autres fonctions map dans d’autres librairies.

Ce qui nous donne


    module Main exposing (..)
    import Html exposing (text, h2, ul, li, div)
    
    fruits = ["pommes","poires","scoubidou","ha"]
    
    fruitDisplayer fruit =
      li [ ] [ text fruit ]
    
    main =
      div []
        [ h2 [] [ text "Fruits :" ]
        , ul [] (List.map fruitDisplayer fruits)
        ]

Et voilà !

Notez que :

* `List.map` renvoyant une liste et `ul` prenant une liste en deuxième paramètre, pas la peine de remettre des crochets.
* Nous avons mis des parenthèses pour regrouper tout cela en un seul paramètre, sinon nous aurions eu une erreur nous disant qu’`ul` ne prenait pas 4 paramètres.

## Signatures et types

Je ne sais pas si vous l’aviez remarqués, mais certains éléments de notre code sont soulignés en pointillés jaune.

Au survol de `fruits` par exemple, Elm (enfin le compilateur) nous indique gentiment qu’il a déduit qu’il s’agissait d’une liste de chaines de caractères : `List String`.

    fruits : List String

De même pour `fruitDisplayer` :

    fruitDisplayer: String -> Html.Html msg

Cette fonction prend une chaine de caractère et retourne du code Html (et éventuellement un message mais ne brulons pas les étapes).

D’ailleurs nous devrions aussi exposer le type Html dans notre programme.

    import Html exposing (Html, text, h2, ul, li, div)

Ce qui nous donnera

    fruitDisplayer: String -> Html msg

Il s’agit de _warnings_ qui n’empêcheront pas votre code de compiler en JS. Elm est assez malin pour déduire pas mal de choses et en retour vous fournir des messages d’erreurs explicites.

Mais il vaut mieux être explicite avec vos signatures, c’est un peu de gymnastique au début, cela vient vite et les bénéfices sont inestimables.

Reprenons :

    module Main exposing (..)

    import Html exposing (Html, text, h2, ul, li, div)
      
    fruits : List String
    fruits =
      [ "pommes", "poires", "scoubidou", "ha" ]
      
    fruitDisplayer : String -> Html msg
      fruitDisplayer fruit =
        li [] [ text fruit ]
      
    main : Html msg
    main =
      div []
        [ h2 [] [ text "Fruits :" ]
        , ul [] (List.map fruitDisplayer fruits)
        ]

Les signatures s’écrivent avec un `:` à la place d’un `=`  et précèdent la fonction correspondante.

Déjà, votre collègue qui reprendra votre code saura tout de suite de quoi il s’agit. C’est mieux qu’un commentaire.

Cela vous indique clairement qui fait quoi. 

Si nous reprenons notre « afficheur de fruits »

Nous pourrions l’écrire aussi :


    viewFruits fruits : List String -> List (Html msg)
    viewFruits fruits =
      fruits |> List.map fruitDisplayer


Décomposons notre fonction : `List.map fruitDisplayer fruits`

	(String -> Html) -> List String -> List (Html msg)

1. Elle prend un premier argument qui est une fonction qui transforme une String en Html.
2. Un second argument qui est une liste de String.
3. Et retourne une liste d’Html.

C’est exactement la signature de `List.map` : 

	map : (a -> b) -> List a -> List b

a et b étant des types indéfinis, mais du moment que nous respectons cette structure cela marchera.

Sur ce [site](http://klaftertief.github.io/elm-search/?q=(+a+-%3E+b)+-%3E+List+a+-%3E+List+b) vous pouvez même chercher la documentation en utilisant les signatures !

Nous pouvons également définir nos propres types avec la commande `type alias`.


    type alias Fruit = String

    fruits : List Fruit
    fruits =
      [ "pommes", "poires", "scoubidou", "ha" ]


Ici nous définissons un fruit comme une chaine de caractères et la liste fruits comme une liste de fruits.

Cela peut paraître un peu restrictif, mais si quelque part vous avez une fonction qui retourne une liste de légumes, quand bien même il s’agirait au final de _Strings_, et que vous l’utilisez comme argument d’une fonction qui prenne une liste de fruits en paramètre, le compilateur vous avertira. Un excellent moyen de ne pas mélanger les torchons et les serviettes.

Le compilateur est votre ami. Ne luttez pas contre lui.

**Programme final** :

{{< ellie 3qfLQSc6KyBa1 >}}