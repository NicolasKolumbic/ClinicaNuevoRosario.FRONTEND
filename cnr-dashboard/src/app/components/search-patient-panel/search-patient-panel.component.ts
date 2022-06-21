import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-search-patient-panel',
  templateUrl: './search-patient-panel.component.html',
  styleUrls: ['./search-patient-panel.component.scss']
})
export class SearchPatientPanelComponent implements OnInit {

  public display: boolean = false;
  public patient?: Patient

  constructor() {}

  ngOnInit(): void {
  }

  CloseModal(event: any) {
    this.display = false;
  }

  selectPatient(patient: Patient) {
    this.patient = patient;
  }

}
