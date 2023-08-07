import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Panel } from '../../models/panel';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

@Component({
  selector: 'cnr-search-patient-panel',
  templateUrl: './search-patient-panel.component.html',
  styleUrls: ['./search-patient-panel.component.scss']
})
export class SearchPatientPanelComponent implements OnInit {

  public display: boolean = false;
  public patient?: Patient;

  constructor(
    private patientService: PatientService,
    private subjectManagerService: SubjectManagerService
  ) {
    const patientCollectionSubject = new GenericSubject<Patient[]>("panel-patient-collection");
    this.subjectManagerService.add(patientCollectionSubject);

    const patientSubject = new GenericSubject<Patient>("panel-patient");
    this.subjectManagerService.add(patientSubject);

  }

  ngOnInit(): void {
    
    
  }

  CloseModal(event: any) {
    this.display = false;
  }

  selectPatient(patient: Patient) {
    this.patient = patient;
  }

  showPatientModal() {
    this.display = true;
  }

  seePatient() {
    this.display = true;
  }

  addPatient(patient: Patient) {
    this.patientService.addPatient(patient).subscribe(patientId => console.log(patientId))
    this.display = false;
  }

}
