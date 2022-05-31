import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel';
import { PanelManagmentService } from '../../services/panel-managment.service';


@Component({
  selector: 'cnr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
    },
    {
      name: 'Calendario',
      order: 3,
      hide: false
    }
  ];

  constructor(private panelManagmentService: PanelManagmentService ) {}

  ngOnInit(): void {}

  moveToTop(panel: any) {
    this.panels = this.panelManagmentService.moveToTop(panel, this.panels);
  }

  moveToUp(panel: any) {
    this.panels = this.panelManagmentService.moveToUp(panel, this.panels);
  }

  moveToDown(panel: any) {
    this.panels = this.panelManagmentService.moveToDown(panel, this.panels);
  }

}
