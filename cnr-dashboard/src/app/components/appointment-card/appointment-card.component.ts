import {Component } from '@angular/core';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from 'src/app/models/doctor';
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

    const patientSubject = this.subjectManagerService.getSubjectByName<any>('panel-patient');
    const patientObservable = new GenericObserver<Patient>((patient: Patient) => this.fullNamePatient = patient.fullName);
    patientSubject.attach(patientObservable);

    const doctorSubject = this.subjectManagerService.getSubjectByName<any>('panel-dashboard-doctor');
    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      this.fullNameDoctor = doctor.fullName;
    });
    doctorSubject.attach(doctorObservable);

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => {
      const appointmentDate = moment(time.toDate());
      this.date = appointmentDate.format('DD/MM/YYYY HH:mm');
    });
    const timeAppointmentSubject = this.subjectManagerService.getSubjectByName<any>('add-appointment-form-time');
    timeAppointmentSubject.attach(timeAppointmentObservable);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.date = moment(appointmentModal.appointment?.time).format('DD/MM/YYYY HH:mm'));
    const appointmentSubject = new GenericSubject<AppointmentModal>('appointment-card-modal');
    appointmentSubject.attach(appointmentObservable);
    this.subjectManagerService.add(appointmentSubject);
  }

}
