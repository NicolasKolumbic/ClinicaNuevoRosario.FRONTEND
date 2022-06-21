import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { Panel } from '../../models/panel';
import { PanelManagmentService } from '../../services/panel-managment.service';


@Component({
  selector: 'cnr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public seeSchedule: Panel;
  public searchPatient: Panel;
  public calendar: Panel;


  constructor(private panelManagmentService: PanelManagmentService ) {
    this.calendar = this.panelManagmentService.calendar;
    this.searchPatient = this.panelManagmentService.searchPatient;
    this.seeSchedule = this.panelManagmentService.seeSchedule;
  }

  ngOnInit(): void {
  }

  moveToTop(panel: any) {
    this.panelManagmentService.moveToTop(panel);
    this.calendar = this.panelManagmentService.calendar;
    this.searchPatient = this.panelManagmentService.searchPatient;
    this.seeSchedule = this.panelManagmentService.seeSchedule;
  }

  moveToUp(panel: any) {
    this.panelManagmentService.moveToUp(panel);
    this.calendar = this.panelManagmentService.calendar;
    this.searchPatient = this.panelManagmentService.searchPatient;
    this.seeSchedule = this.panelManagmentService.seeSchedule;
  }

  moveToDown(panel: any) {
    this.panelManagmentService.moveToDown(panel);
    this.calendar = this.panelManagmentService.calendar;
    this.searchPatient = this.panelManagmentService.searchPatient;
    this.seeSchedule = this.panelManagmentService.seeSchedule;
  }


}
