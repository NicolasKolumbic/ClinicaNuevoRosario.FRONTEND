import { Component, Input, OnInit } from '@angular/core';
import { ServiceTypes } from 'src/app/helpers/enums/service-types';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'cnr-service-type-pill',
  templateUrl: './service-type-pill.component.html',
  styleUrls: ['./service-type-pill.component.scss']
})
export class ServiceTypePillComponent implements OnInit {

  @Input() appointment!: Appointment; 

  serviceTypeName!: string;

  constructor() { }

  ngOnInit(): void {
    if(this.appointment) {
      this.serviceTypeName = ServiceTypes[this.appointment.serviceType];
    } 
  }

  get isComplexStudy() {
    return this.appointment.serviceType === ServiceTypes.EstudioComplejo;
  }

  get isMedicalGuard() {
    return this.appointment.serviceType === ServiceTypes.Guardia;
  }

  get isHospitalStay() {
    return this.appointment.serviceType === ServiceTypes.Internacion;
  }

  get isLab() {
    return this.appointment.serviceType === ServiceTypes.Laboratorio;
  }

}
