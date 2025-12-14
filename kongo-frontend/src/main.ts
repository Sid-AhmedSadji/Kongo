// ============================================
// FICHIER : main.ts
// RÔLE : Point d'entrée de l'application Angular
// C'est le premier fichier exécuté au démarrage
// ============================================

// Import de la fonction bootstrapApplication depuis Angular
// Cette fonction démarre l'application Angular
import { bootstrapApplication } from '@angular/platform-browser';

// Import de la configuration de l'application
import { appConfig } from './app/app.config';

// Import du composant racine de l'application
// ⚠️ IMPORTANT : Utilise AppComponent (le nom exporté dans app.ts)
import { AppComponent } from './app/app';

// ============================================
// DÉMARRAGE DE L'APPLICATION
// ============================================

// bootstrapApplication() lance l'application Angular
// Paramètre 1 : Le composant racine (AppComponent)
// Paramètre 2 : La configuration (routes, providers, etc.)
bootstrapApplication(AppComponent, appConfig)
  // .catch() : Capture les erreurs de démarrage
  .catch((err) => console.error(err));

// ============================================
// FLUX DE DÉMARRAGE
// ============================================
/*
1. Le navigateur charge index.html
   ↓
2. index.html contient <app-root></app-root>
   ↓
3. main.ts s'exécute et lance bootstrapApplication()
   ↓
4. Angular initialise AppComponent
   ↓
5. AppComponent affiche Navbar + RouterOutlet
   ↓
6. L'application est prête !
*/
