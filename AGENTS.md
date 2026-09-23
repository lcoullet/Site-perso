# Directives et Bonnes Pratiques du Projet (Site Personnel)

Ce document définit les standards d'architecture, d'accessibilité et de développement pour tout agent ou développeur travaillant sur ce dépôt.

---

## 1. Documentation Officielle et Outils IA

* **MCP Astro Docs** : Pour tout développement, ajout d'intégration ou modification de code Astro (`.astro`, `astro.config.mjs`, collections de contenu `src/content.config.ts`), utiliser en priorité le serveur MCP officiel **Astro Docs** (`https://mcp.docs.astro.build/mcp`, configuré sous l'identifiant `astro-docs`).
* **Modern Web Guidance** : Consulter et appliquer les standards web modernes (Baseline W3C) pour éviter les polyfills obsolètes et favoriser les APIs natives de la plateforme web.

---

## 2. Standards Web & Performance

* **Animations & Défilement** :
  - Privilégier les animations natives du compositeur CSS (ex. **Scroll-Driven Animations** avec `animation-timeline: scroll()`) plutôt que des écouteurs JavaScript synchrones sur l'événement `scroll`.
  - Fournir systématiquement un repli progressif sous `!CSS.supports()` pour les navigateurs non compatibles.
  - Toujours respecter la préférence utilisateur `@media (prefers-reduced-motion: no-preference)`.
* **Thème & Apparence** :
  - Utiliser l'API native **View Transitions** (`document.startViewTransition()`) pour les transitions de thème sombre/clair.
  - Ne jamais appliquer de transitions universelles (`* { transition: ... }`) qui dégradent les performances de rendu.
  - Maintenir la compatibilité native avec `color-scheme: light dark;` sur `:root` et `color-scheme: dark;` sur `.dark`.
* **Barres de défilement** :
  - Utiliser les propriétés standard W3C (`scrollbar-width`, `scrollbar-color`), avec repli `::-webkit-scrollbar` conditionné par `@supports not (scrollbar-color: auto)`.
* **Typographie & Rendu** :
  - Appliquer `text-wrap: balance;` sur les titres (`h1`-`h6`).
  - Appliquer `text-wrap: pretty;` sur les paragraphes (`p`, `blockquote`, `li`) pour éviter les orphelins.
* **Core Web Vitals & Chargement** :
  - **Ne jamais** placer `loading="lazy"` sur l'élément visuel principal au-dessus de la ligne de flottaison (candidat LCP).
  - Déclarer `fetchpriority="high"` sur le candidat LCP.

---

## 3. Accessibilité (A11y) & Qualité du Code

* **Icônes SVG décoratives** : Tout élément `<svg>` purement décoratif ou accompagné d'un texte visible doit comporter l'attribut `aria-hidden="true"`.
* **Conteneurs décoratifs** : Tout conteneur visuel d'effet ou barre de défilement décorative doit comporter `aria-hidden="true"`.
* **Sélecteurs CSS modernes** : Préférer `:has()` (ex. `article:has(.main-link:focus-visible)`) pour styler les conteneurs interactifs.
* **Impression** : Toute nouvelle page ou composant doit s'intégrer harmonieusement avec la feuille de style `@media print` globale définie dans `src/styles/global.css`.
* **Cohérence Tailwind** : Utiliser exclusivement les teintes et échelles officielles de la palette Tailwind CSS (ex. `zinc-50` à `zinc-950`).

---

## 4. Validation des Modifications

* Avant toute finalisation ou proposition de commit, valider l'intégrité du site via la commande :
  ```sh
  npm run build
  ```
  Le build statique doit compiler l'ensemble des routes sans erreur ni avertissement.
