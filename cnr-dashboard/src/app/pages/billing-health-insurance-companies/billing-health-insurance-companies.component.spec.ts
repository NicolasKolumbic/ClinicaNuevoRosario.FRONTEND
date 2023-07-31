import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingHealthInsuranceCompaniesComponent } from './billing-health-insurance-companies.component';

describe('BillingHealthInsuranceCompaniesComponent', () => {
  let component: BillingHealthInsuranceCompaniesComponent;
  let fixture: ComponentFixture<BillingHealthInsuranceCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingHealthInsuranceCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingHealthInsuranceCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
