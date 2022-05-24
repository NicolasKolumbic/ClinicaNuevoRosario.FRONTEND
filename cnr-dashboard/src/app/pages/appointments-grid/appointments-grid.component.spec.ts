import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsGridComponent } from './appointments-grid.component';

describe('AppointmentsGridComponent', () => {
  let component: AppointmentsGridComponent;
  let fixture: ComponentFixture<AppointmentsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
