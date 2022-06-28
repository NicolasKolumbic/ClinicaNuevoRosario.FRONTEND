import {Component } from '@angular/core';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AppointmentModalSubject } from 'src/app/patterns/observer/concrete-classes/appointment-modal-subject';
import { AppointmentTimeSubject } from 'src/app/patterns/observer/concrete-classes/appointment-time';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { PatientSubject } from 'src/app/patterns/observer/concrete-classes/patient-subject';


@Component({
  selector: 'cnr-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent {

  public date?: string;
  public fullNamePatient?: string;
  public fullNameDoctor?: string;

  constructor(
    private doctorSubject: DoctorSubject,
    private patientSubject: PatientSubject,
    private appointmentTimeSubject: AppointmentTimeSubject,
    private appointmentModalSubject: AppointmentModalSubject,
  ) {

    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => this.fullNameDoctor = doctor.fullName);
    this.doctorSubject.subject?.attach(doctorObservable);

    const patientObservable = new GenericObserver<Patient>((patient: Patient) => this.fullNamePatient = patient.fullName);
    this.patientSubject.subject?.attach(patientObservable);

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => {
      this.date = time.format('DD/MM/YYYY HH:mm');
    });
    this.appointmentTimeSubject.subject?.attach(timeAppointmentObservable);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.date = moment(appointmentModal.appointment?.time).format('DD/MM/YYYY HH:mm'));
    this.appointmentModalSubject.subject?.attach(appointmentObservable);
  }

}
