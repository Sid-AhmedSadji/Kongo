import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrls: ['./newsletter.scss'],
})
export class NewsletterComponent {
  email = '';
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  subscribe() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http
      .post('https://localhost:3000/api/newsletter', { email: this.email })
      .subscribe({
        next: () => {
          this.successMessage = 'Inscription réussie ✨';
          this.email = '';
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Erreur lors de l’inscription';
          this.loading = false;
        },
      });
  }
}
