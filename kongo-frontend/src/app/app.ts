// ============================================
// FICHIER : app.ts (ou app.component.ts)
// RÔLE : Composant racine de toute l'application
// C'est le conteneur principal qui englobe toutes les pages
// ============================================

// Import du décorateur Component depuis Angular Core
// Un décorateur est une fonction qui ajoute des métadonnées à une classe
import { Component } from '@angular/core';

// Import de RouterOutlet depuis Angular Router
// RouterOutlet est une directive qui affiche le composant correspondant à l'URL actuelle
// C'est comme un "trou" dans le template où Angular injecte la page active
import { RouterOutlet } from '@angular/router';

// Import du composant Navbar (menu de navigation)
// Ce composant sera affiché sur TOUTES les pages
import { Navbar } from './shared/navbar/navbar';

// ============================================
// DÉCORATEUR @Component
// ============================================
@Component({
  // selector: nom de la balise HTML personnalisée pour ce composant
  // Dans index.html, on aura <app-root></app-root>
  selector: 'app-root',

  // imports: liste des composants et directives utilisés dans le template
  // Depuis Angular 19+, on utilise standalone components (plus besoin de modules)
  imports: [
    // RouterOutlet permet d'afficher dynamiquement les pages selon l'URL
    // C'est l'endroit où Home, Services ou Contact seront injectés
    RouterOutlet,

    // Navbar sera affiché en permanence (menu fixe en haut)
    // ⚠️ ATTENTION : utilise Navbar (pas NavbarComponent)
    Navbar,
  ],

  // templateUrl: chemin vers le fichier HTML du template
  // C'est la structure visuelle du composant
  templateUrl: './app.html',

  // styleUrl: chemin vers le fichier SCSS des styles
  // Ce sont les styles CSS spécifiques à ce composant
  styleUrl: './app.scss',
})

// ============================================
// CLASSE DU COMPOSANT
// ============================================
export class AppComponent {
  // Propriété title : peut être utilisée dans le template
  // Par exemple : {{ title }} dans app.html afficherait "KONGO by AMENYS"
  title = 'KONGO by AMENYS';
}

// ============================================
// STRUCTURE VISUELLE (app.html ressemblera à ça)
// ============================================
/*
<app-navbar></app-navbar>    ← Menu fixe toujours visible
<router-outlet></router-outlet>  ← Ici s'affichent Home/Services/Contact selon l'URL
*/

// ============================================
// FLUX D'AFFICHAGE
// ============================================
/*
1. L'application Angular démarre
   ↓
2. Angular cherche <app-root> dans index.html
   ↓
3. Angular affiche AppComponent (ce fichier)
   ↓
4. AppComponent affiche Navbar (menu)
   ↓
5. RouterOutlet vérifie l'URL actuelle
   ↓
6. RouterOutlet affiche le bon composant (Home/Services/Contact)
   selon les routes définies dans app.routes.ts
*/
