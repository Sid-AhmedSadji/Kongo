// ============================================
// FICHIER : app.routes.ts
// RÔLE : Configure toutes les routes (URLs) de l'application
// ============================================

// Import du type Routes depuis Angular Router
// Routes est un tableau qui définit toutes les URLs de notre site
import { Routes } from '@angular/router';

// Import des composants de pages que nous avons créés
// Chaque composant correspond à une page du site
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';

// Définition et export du tableau des routes
// Ce tableau sera utilisé par Angular pour savoir quelle page afficher selon l'URL
export const routes: Routes = [
  // ============================================
  // ROUTE PAR DÉFAUT (Redirection)
  // ============================================
  {
    // path: '' signifie l'URL racine (https://localhost:4200/)
    path: '',

    // redirectTo: redirige automatiquement vers une autre route
    redirectTo: '/home',

    // pathMatch: 'full' signifie que la redirection ne se fait QUE si l'URL est exactement ''
    // Sans 'full', la redirection se ferait pour toutes les URLs
    pathMatch: 'full',
  },

  // ============================================
  // ROUTE HOME (Page d'accueil)
  // ============================================
  {
    // path: 'home' crée l'URL https://localhost:4200/home
    path: 'home',

    // component: définit quel composant Angular afficher pour cette URL
    // ⚠️ ATTENTION : utilise Home (pas HomeComponent)
    component: Home,

    // title: définit le titre qui apparaît dans l'onglet du navigateur
    title: "KONGO - L'Éveil des Sens",
  },

  // ============================================
  // ROUTE SERVICES (Page services)
  // ============================================
  {
    // URL : https://localhost:4200/services
    path: 'services',

    // Affiche le composant Services
    // ⚠️ ATTENTION : utilise Services (pas ServicesComponent)
    component: Services,

    // Titre dans l'onglet du navigateur
    title: 'Services - KONGO by AMENYS',
  },

  // ============================================
  // ROUTE CONTACT (Page contact)
  // ============================================
  {
    // URL : https://localhost:4200/contact
    path: 'contact',

    // Affiche le composant Contact
    // ⚠️ ATTENTION : utilise Contact (pas ContactComponent)
    component: Contact,

    // Titre dans l'onglet du navigateur
    title: 'Contact - KONGO by AMENYS',
  },

  // ============================================
  // ROUTE WILDCARD (Toutes les autres URLs)
  // ============================================
  {
    // path: '**' capture TOUTES les URLs qui ne correspondent à aucune route ci-dessus
    // Par exemple : /blabla, /page-inexistante, etc.
    path: '**',

    // Redirige automatiquement vers /home
    // Cela évite d'avoir des pages 404
    redirectTo: '/home',
  },
];

// ============================================
// FLUX DE NAVIGATION
// ============================================
/*
Exemple 1 : L'utilisateur tape https://localhost:4200/
→ path: '' est détecté
→ Redirection automatique vers /home
→ Home est affiché

Exemple 2 : L'utilisateur clique sur "Services"
→ path: 'services' est détecté
→ Services est affiché
→ Titre de l'onglet devient "Services - KONGO by AMENYS"

Exemple 3 : L'utilisateur tape https://localhost:4200/erreur
→ Aucune route ne correspond
→ path: '**' (wildcard) capture l'URL
→ Redirection vers /home
*/
