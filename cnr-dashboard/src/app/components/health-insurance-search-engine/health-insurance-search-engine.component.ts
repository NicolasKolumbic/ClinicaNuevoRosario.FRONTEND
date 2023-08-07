import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from '../../models/plan';
import { HealthInsuranceService } from 'src/app/services/health-insurance.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

@Component({
  selector: 'cnr-health-insurance-search-engine',
  templateUrl: './health-insurance-search-engine.component.html',
  styleUrls: ['./health-insurance-search-engine.component.scss']
})
export class HealthInsuranceSearchEngineComponent implements OnInit {

  private healthInsurances?: Plan[]= [];

  @Input() healthInsuranceSubjectName!: string;
  @Input() healthInsuranceOptionsSubjectName!: string;
  @Input() set healthInsurance(value: Plan) {
    this.selectedHealthInsurance = value;
  }

  selectedHealthInsurance?: Plan;

  @Output() onSelectedHealthInsurrancePlan: EventEmitter<Plan> = new EventEmitter<Plan>();

  constructor(
    private healthInsuranceService: HealthInsuranceService,
    private subjectManagerService: SubjectManagerService
  ) {
  }

  get healthInsurancesOptions(): any[] {
    return this.healthInsurances as any[];
  }

  ngOnInit(): void {
    this.healthInsuranceService.getAllHealthInsurrancePlans().subscribe(healthInsurancesPlans => {
      this.healthInsurances = healthInsurancesPlans;
    })
  }

  searchHealthInsurance(value: {originalEvnet: any, filter: string}) {

  }

  selectHealthInsurance(healthInsurance: any) {
    if(healthInsurance) {
      this.selectedHealthInsurance = healthInsurance;
      this.subjectManagerService.getSubjectByName(this.healthInsuranceSubjectName).update(healthInsurance);
      this.onSelectedHealthInsurrancePlan.emit(healthInsurance);
    }

  }

  clear() {
    this.selectedHealthInsurance = undefined;
  }

}
