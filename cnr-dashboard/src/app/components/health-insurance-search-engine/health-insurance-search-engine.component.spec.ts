import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceSearchEngineComponent } from './health-insurance-search-engine.component';

describe('HealthInsuranceSearchEngineComponent', () => {
  let component: HealthInsuranceSearchEngineComponent;
  let fixture: ComponentFixture<HealthInsuranceSearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthInsuranceSearchEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceSearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
