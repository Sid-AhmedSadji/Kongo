// ============================================
// COMPOSANT NAVBAR (Menu de Navigation)
// ============================================

import { Component } from '@angular/core';
// Import des directives de routing
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  // ⚠️ IMPORTANT : Ces imports permettent la navigation
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // Pas de logique nécessaire
}
