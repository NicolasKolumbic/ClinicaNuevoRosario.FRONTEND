import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'cnr-patient-search-engine',
  templateUrl: './patient-search-engine.component.html',
  styleUrls: ['./patient-search-engine.component.scss']
})
export class PatientSearchEngineComponent {

  patients?: Patient[] = [];

  selectedPatient?: Patient;

  @Output() onSelectPatient: EventEmitter<Patient> = new EventEmitter();

  get patientOptions() {
    return this.patients as any[];
  }

  constructor(private patientService: PatientService) {}

  searchPatient(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter.length > 3) {
      this.patientService.search(value.filter)
      .subscribe((patientsReponse: Patient[]) => this.patients = patientsReponse);
    }
  }


  PatientUpdateBlur(evento: any) {
    if(this.selectedPatient) {
      this.onSelectPatient.emit(this.selectedPatient);
    }
  }



}
