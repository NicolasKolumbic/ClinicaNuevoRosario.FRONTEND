import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatePillComponent } from './appointment-state-pill.component';

describe('AppointmentStatePillComponent', () => {
  let component: AppointmentStatePillComponent;
  let fixture: ComponentFixture<AppointmentStatePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentStatePillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStatePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
