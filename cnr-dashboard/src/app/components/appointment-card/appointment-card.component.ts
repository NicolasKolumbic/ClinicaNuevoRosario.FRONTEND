import {Component } from '@angular/core';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Patient } from 'src/app/models/patient';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';


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
    private subjectManagerService: SubjectManagerService
  ) {

    // recibe doctor seleccionado

    const patientObservable = new GenericObserver<Patient>((patient: Patient) => this.fullNamePatient = patient.fullName);
    const patientSubject = new GenericSubject<Patient>('appointment-card-patient');
    patientSubject.attach(patientObservable);
    this.subjectManagerService.add(patientSubject);

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => {
      const appointmentDate = moment(time.toDate());
      this.date = appointmentDate.format('DD/MM/YYYY HH:mm');
    });
    const timeAppointmentSubject = new GenericSubject<moment.Moment>('appointment-card-time');
    timeAppointmentSubject.attach(timeAppointmentObservable);
    this.subjectManagerService.add(timeAppointmentSubject);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.date = moment(appointmentModal.appointment?.time).format('DD/MM/YYYY HH:mm'));
    const appointmentSubject = new GenericSubject<AppointmentModal>('appointment-card-modal');
    appointmentSubject.attach(appointmentObservable);
    this.subjectManagerService.add(appointmentSubject);
  }

}
