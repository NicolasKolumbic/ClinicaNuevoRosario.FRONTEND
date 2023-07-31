import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAppointmentsComponent } from './quick-appointments.component';

describe('QuickAppointmentsComponent', () => {
  let component: QuickAppointmentsComponent;
  let fixture: ComponentFixture<QuickAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
