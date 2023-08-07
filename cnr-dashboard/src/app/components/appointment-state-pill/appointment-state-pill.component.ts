import { Component, Input, OnInit } from '@angular/core';
import { AppointmentStates } from 'src/app/helpers/enums/appointment-states';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'cnr-appointment-state-pill',
  templateUrl: './appointment-state-pill.component.html',
  styleUrls: ['./appointment-state-pill.component.scss']
})
export class AppointmentStatePillComponent implements OnInit {

  @Input() appointment!: Appointment; 

  constructor() { }

  ngOnInit(): void {
    
  }

  get appointmentStateName() {
    return this.appointment && AppointmentStates[this.appointment.appointmentState];
  }

  get isAbsent() {
    return this.appointment.appointmentState === AppointmentStates.Ausente;
  }

  get isCancelled() {
    return this.appointment.appointmentState === AppointmentStates.Cancelado;
  }

  get isFinalized() {
    return this.appointment.appointmentState === AppointmentStates.Finalizado;
  }

  get isOpen() {
    return this.appointment.appointmentState === AppointmentStates.Abierto;
  }

}
