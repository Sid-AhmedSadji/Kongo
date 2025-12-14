import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the booking form', () => {
    expect(component.bookingForm).toBeTruthy();
  });

  it('should invalidate empty form', () => {
    expect(component.bookingForm.valid).toBeFalse();
  });
});