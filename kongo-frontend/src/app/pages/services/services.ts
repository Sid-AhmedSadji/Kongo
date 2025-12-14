import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  constructor(private router: Router) {}

  goToBooking(): void {
    // ex: faire un tracking ici si besoin
    this.router.navigate(['/booking']);
  }
}
