import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-see-schedule-panel',
  templateUrl: './see-schedule-panel.component.html',
  styleUrls: ['./see-schedule-panel.component.scss']
})
export class SeeSchedulePanelComponent implements OnInit {

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

  constructor() {


  }

  ngOnInit(): void {
  }

  CloseModal(event: any) {
    this.display = false;
  }
}
