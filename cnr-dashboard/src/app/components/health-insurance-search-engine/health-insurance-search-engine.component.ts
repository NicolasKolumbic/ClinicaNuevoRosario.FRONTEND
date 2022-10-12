import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Plan } from '../../models/plan';
import { HealthInsuranceService } from 'src/app/services/health-insurance.service';

@Component({
  selector: 'cnr-health-insurance-search-engine',
  templateUrl: './health-insurance-search-engine.component.html',
  styleUrls: ['./health-insurance-search-engine.component.scss']
})
export class HealthInsuranceSearchEngineComponent implements OnInit {

  private healthInsurances?: Plan[]= [];

  selectedHealthInsurance?: any;

  @Output() onSelectedHealthInsurrancePlan: EventEmitter<Plan> = new EventEmitter<Plan>();

  constructor(private healthInsuranceService: HealthInsuranceService) {
    this.healthInsuranceService.getAllHealthInsurrancePlans().subscribe(healthInsurancesPlans => {
      this.healthInsurances = healthInsurancesPlans;
    })
  }

  get healthInsurancesOptions(): any[] {
    return this.healthInsurances as any[];
  }

  ngOnInit(): void {
  }

  searchHealthInsurance(value: {originalEvnet: any, filter: string}) {

  }

  selectHealthInsurance(healthInsurance: any) {
      this.selectedHealthInsurance = healthInsurance;
      this.onSelectedHealthInsurrancePlan.emit(healthInsurance);
  }

}
