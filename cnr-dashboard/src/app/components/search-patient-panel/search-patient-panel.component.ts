import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-search-patient-panel',
  templateUrl: './search-patient-panel.component.html',
  styleUrls: ['./search-patient-panel.component.scss']
})
export class SearchPatientPanelComponent implements OnInit {

  public display: boolean = false;

  public panels: Panel[] = [
    {
      name: 'Ver Agenda',
      order: 1,
      hide: false
    },
    {
      name: 'Buscar Paciente',
      order: 2,
      hide: false
    }
  ]

  constructor(private patientService: PatientService) {


  }

  ngOnInit(): void {
  }

  CloseModal(event: any) {
    this.display = false;
  }

}
