import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchEngineComponent } from './patient-search-engine.component';

describe('PatientSearchEngineComponent', () => {
  let component: PatientSearchEngineComponent;
  let fixture: ComponentFixture<PatientSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSearchEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
