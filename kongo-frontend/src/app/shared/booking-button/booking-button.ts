import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-button',
  imports: [],
  templateUrl: './booking-button.html',
  styleUrl: './booking-button.scss',
})
export class BookingButton {

  constructor(public router: Router) {}

  goToBooking() {
    this.router.navigate(['/booking']);
  } 
}
