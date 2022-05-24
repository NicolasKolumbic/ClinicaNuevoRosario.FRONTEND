import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalSpecialtiesSearchEngineComponent } from './medical-specialties-search-engine.component';

describe('MedicalSpecialtiesSearchEngineComponent', () => {
  let component: MedicalSpecialtiesSearchEngineComponent;
  let fixture: ComponentFixture<MedicalSpecialtiesSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalSpecialtiesSearchEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalSpecialtiesSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
