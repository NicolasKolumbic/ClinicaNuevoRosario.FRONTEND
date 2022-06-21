import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-see-schedule-panel',
  templateUrl: './see-schedule-panel.component.html',
  styleUrls: ['./see-schedule-panel.component.scss']
})
export class SeeSchedulePanelComponent implements OnInit {

  public display: boolean = false;
  public doctor?: Doctor;

  constructor() { }

  ngOnInit(): void {
  }

  CloseModal(event: any) {
    this.display = false;
  }

  assignDoctor(doctor: Doctor) {
    this.doctor = doctor;
  }

}
