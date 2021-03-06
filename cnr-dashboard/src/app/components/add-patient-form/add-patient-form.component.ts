import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HealthInsurance } from 'src/app/models/health-insurance';
import { Patient } from 'src/app/models/patient';
import { Plan } from 'src/app/models/plan';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'cnr-add-patient-form',
  templateUrl: './add-patient-form.component.html',
  styleUrls: ['./add-patient-form.component.scss']
})
export class AddPatientFormComponent implements OnInit {

  public healthInsurrances: HealthInsurance[] = [];
  public plans: Plan[] = [];
  public addPatientForm: FormGroup;

  selectedhealthInsurrance?: HealthInsurance;
  selectedPlan?: Plan;

  @Output() onAddPatient: EventEmitter<Patient> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {

    this.addPatientForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      identificationNumber: [null],
      phoneNumber: [null],
      healthInsurrance: [null],
      email: ['']
    })

  }

  ngOnInit(): void {
    this.patientService.getAllHealthInsurrance()
      .subscribe((healthInsurrances: HealthInsurance[]) => this.healthInsurrances = healthInsurrances);
  }

  AddPatient(e: any) {
    const newPatient = Object.assign(this.addPatientForm.value, {
       healthInsurance: this.selectedhealthInsurrance,
       plan: this.selectedPlan
    });
    this.addPatientForm.reset();
    this.selectedhealthInsurrance = undefined;
    this.selectedPlan = undefined;
    this.onAddPatient.emit(newPatient);
  }

  selectHealthInsurrance(healthInsurance: HealthInsurance) {
    if(healthInsurance) {
      this.plans = healthInsurance.plans;
    }

  }

}
