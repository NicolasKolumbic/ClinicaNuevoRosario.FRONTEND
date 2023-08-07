import { Component, EventEmitter, Output, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { PatientService } from 'src/app/services/patient.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

@Component({
  selector: 'cnr-patient-search-engine',
  templateUrl: './patient-search-engine.component.html',
  styleUrls: ['./patient-search-engine.component.scss']
})
export class PatientSearchEngineComponent implements OnInit {

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

  ngOnInit(): void {
    const patientObservable = new GenericObserver<Patient>((patient: Patient) => {
      this.onSelectPatient.emit(patient);
    });
    
    this.subjectManagerService.getSubjectByName(this.patientSubjectName).attach(patientObservable)

    const patientsObservable = new GenericObserver<Patient[]>((patients: Patient[]) => {
      this.patients = patients
    });
    
    this.subjectManagerService.getSubjectByName(this.patientOptionsSubjectName).attach(patientsObservable)
  }

  searchPatient(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter && value.filter.length > 3) {
      this.patientService.search(value.filter)
      .subscribe((patientsReponse: Patient[]) => {
        this.subjectManagerService.getSubjectByName(this.patientOptionsSubjectName).update(patientsReponse);
      });
    }
  }


  PatientUpdateBlur(evento: any) {
    if(this.selectedPatient) {
      this.subjectManagerService.getSubjectByName(this.patientSubjectName).update(this.selectedPatient);
    }
  }



}
