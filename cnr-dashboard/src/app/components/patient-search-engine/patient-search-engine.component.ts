import { Component, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

@Component({
  selector: 'cnr-patient-search-engine',
  templateUrl: './patient-search-engine.component.html',
  styleUrls: ['./patient-search-engine.component.scss']
})
export class PatientSearchEngineComponent {

  patients?: Patient[] = [];

  selectedPatient?: Patient;

  @Input() patientSubjectName!: string;
  @Input() patientOptionsSubjectName!: string;
  @Input() set patient(value: Patient) {
    this.selectedPatient = value;
  }

  @Output() onSelectPatient: EventEmitter<Patient> = new EventEmitter();

  get patientOptions() {
    return this.patients as any[];
  }

  constructor(
    private patientService: PatientService,
    private subjectManagerService: SubjectManagerService
  ) {}

  searchPatient(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter && value.filter.length > 3) {
      this.patientService.search(value.filter)
      .subscribe((patientsReponse: Patient[]) => {
        this.patients = patientsReponse
        this.subjectManagerService.getSubjectByName(this.patientOptionsSubjectName).update(patientsReponse);
      });
    }
  }


  PatientUpdateBlur(evento: any) {
    if(this.selectedPatient) {
      this.onSelectPatient.emit(this.selectedPatient);
      this.subjectManagerService.getSubjectByName(this.patientSubjectName).update(this.selectedPatient);
    }
  }



}
