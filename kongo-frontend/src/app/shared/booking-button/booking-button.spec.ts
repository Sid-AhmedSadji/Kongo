import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingButton } from './booking-button';

describe('BookingButton', () => {
  let component: BookingButton;
  let fixture: ComponentFixture<BookingButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
