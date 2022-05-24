import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsGridComponent } from './patients-grid.component';

describe('PatientsGridComponent', () => {
  let component: PatientsGridComponent;
  let fixture: ComponentFixture<PatientsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
