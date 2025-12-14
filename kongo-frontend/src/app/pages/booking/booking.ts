import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type Slot = { label: string; value: string }; // value = ISO datetime string

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class Booking implements OnDestroy {
  bookingForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  availableSlots: Slot[] = [];

  // Configuration des heures creuses (modifiable)
  private ALLOWED_SLOTS = [
    { start: '10:00', end: '12:00' }, // matin creux
    { start: '14:00', end: '16:00' }  // après-midi creux
  ];
  private SLOT_MINUTES = 60; // pas de créneau en minutes

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],       // date (YYYY-MM-DD)
      time_slot: ['', Validators.required]   // valeur ISO datetime
    });

    // Regénérer les créneaux quand la date change
    this.bookingForm.get('date')!
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(date => {
        this.successMessage = '';
        this.errorMessage = '';
        this.generateSlotsForDate(date);
        // reset du time_slot si la date change
        this.bookingForm.get('time_slot')!.setValue('');
      });
  }

  // Génère les créneaux disponibles pour une date donnée (format 'YYYY-MM-DD')
  private generateSlotsForDate(dateStr: string) {
    this.availableSlots = [];
    if (!dateStr) return;

    for (const slot of this.ALLOWED_SLOTS) {
      const startParts = slot.start.split(':').map(Number);
      const endParts = slot.end.split(':').map(Number);

      // Construire Date objets en local time
      const start = new Date(dateStr);
      start.setHours(startParts[0], startParts[1], 0, 0);

      const end = new Date(dateStr);
      end.setHours(endParts[0], endParts[1], 0, 0);

      for (let t = start.getTime(); t <= end.getTime(); t += this.SLOT_MINUTES * 60_000) {
        const dt = new Date(t);
        // Label lisible (ex: 10:00)
        const hh = dt.getHours().toString().padStart(2, '0');
        const mm = dt.getMinutes().toString().padStart(2, '0');
        const label = `${hh}:${mm}`;
        // Valeur ISO locale sans timezone offset (YYYY-MM-DDTHH:mm)
        const isoLocal = this.toLocalIsoString(dt);
        this.availableSlots.push({ label, value: isoLocal });
      }
    }
  }

  // Convertit Date en string ISO local (YYYY-MM-DDTHH:mm)
  private toLocalIsoString(d: Date) {
    const yyyy = d.getFullYear();
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const hh = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  // Soumission du formulaire : envoie la valeur time_slot (ISO local) comme date_rdv
  submitBooking() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.bookingForm.invalid) {
      this.errorMessage = 'Formulaire invalide. Vérifie les champs.';
      return;
    }

    const payload = {
      full_name: this.bookingForm.value.full_name,
      email: this.bookingForm.value.email,
      date_rdv: this.bookingForm.value.time_slot // ISO local string
    };

    // Appel HTTP (exemple). Remplace l'URL par la tienne.
    this.http.post('/api/bookings', payload).subscribe({
      next: () => {
        this.successMessage = 'Réservation enregistrée avec succès !';
        this.bookingForm.reset();
        this.availableSlots = [];
      },
      error: (err) => {
        if (err?.status === 409) {
          this.errorMessage = 'Ce créneau est déjà réservé.';
        } else if (err?.status === 400 && err?.error === 'OUTSIDE_ALLOWED_HOURS') {
          this.errorMessage = 'Le créneau est hors des heures autorisées (serveur).';
        } else {
          this.errorMessage = 'Erreur lors de la réservation. Veuillez réessayer.';
        }
      }
    });
  }

  // Helper pour désactiver le bouton si pas de créneaux générés
  get noSlotsAvailable() {
    return this.availableSlots.length === 0;
  }

  // Getters pour le template
  get dateControl() {
    return this.bookingForm.get('date');
  }
  get timeSlotControl() {
    return this.bookingForm.get('time_slot');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByIndex(index: number, item: Slot) {
    return index;
  }
}