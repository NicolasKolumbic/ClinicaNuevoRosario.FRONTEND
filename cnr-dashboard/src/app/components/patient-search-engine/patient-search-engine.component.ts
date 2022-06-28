import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { PatientListSubject } from 'src/app/patterns/observer/concrete-classes/patient-list-subject';
import { PatientSubject } from 'src/app/patterns/observer/concrete-classes/patient-subject';
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

  constructor(
    private patientService: PatientService,
    private patientSubject: PatientSubject,
    private patientListSubject: PatientListSubject,
    private cdRef: ChangeDetectorRef
  ) {
    const patientObservable = new GenericObserver<Patient>((patient: Patient) => {
        if(this.selectedPatient !== patient) {
          this.selectedPatient = patient;
          this.cdRef.detectChanges();
        }
    });

    this.patientSubject.subject?.attach(patientObservable);

    const patientListObservable = new GenericObserver<Patient[]>((patients: Patient[]) => this.patients = patients);
    this.patientListSubject.subject?.attach(patientListObservable);
  }

  searchPatient(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter && value.filter.length > 3) {
      this.patientService.search(value.filter)
      .subscribe((patientsReponse: Patient[]) => {
        this.patients = patientsReponse
        this.patientListSubject.subject?.update(patientsReponse);
      });
    }
  }


  PatientUpdateBlur(evento: any) {
    if(this.selectedPatient) {
      this.onSelectPatient.emit(this.selectedPatient);
      this.patientSubject.subject?.update(this.selectedPatient);
    }
  }



}
