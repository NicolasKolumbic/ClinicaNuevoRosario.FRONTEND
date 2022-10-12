import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSchedulesManagerComponent } from './doctor-schedules-manager.component';

describe('DoctorSchedulesManagerComponent', () => {
  let component: DoctorSchedulesManagerComponent;
  let fixture: ComponentFixture<DoctorSchedulesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSchedulesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSchedulesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
