import { Component } from '@angular/core';
import { NewsletterComponent } from '../../shared/newsletter/newsletter';

@Component({
  selector: 'app-home',
  imports: [NewsletterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
