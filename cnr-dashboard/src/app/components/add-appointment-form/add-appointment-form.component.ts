import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from 'src/app/models/doctor';
import { DoctorSchedule } from 'src/app/models/doctor-schedule';
import { Patient } from 'src/app/models/patient';
import { AppointmentModalSubject } from 'src/app/patterns/observer/concrete-classes/appointment-modal-subject';
import { AppointmentTimeSubject } from 'src/app/patterns/observer/concrete-classes/appointment-time';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { PatientSubject } from 'src/app/patterns/observer/concrete-classes/patient-subject';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'cnr-add-appointment-form',
  templateUrl: './add-appointment-form.component.html',
  styleUrls: ['./add-appointment-form.component.scss']
})
export class AddAppointmentFormComponent implements OnInit {

  public addAppointmenttForm: FormGroup;
  public today!: Date;
  public defaultDate!: Date;
  public disabledDays!: number[];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorSubject: DoctorSubject,
    private patientSubject: PatientSubject,
    private appointmentTimeSubject: AppointmentTimeSubject,
    private appointmentModalSubject: AppointmentModalSubject,

  ) {
    this.addAppointmenttForm = this.formBuilder.group({
      time: [''],
      patient: [''],
      doctor: [''],
      comments: ['algo']
    });
    this.defaultDate = new Date(Date.now());
    this.defaultDate?.setHours(6);
    this.defaultDate?.setMinutes(0);

    this.today = new Date(Date.now());
    this.today?.setHours(6);
    this.today?.setMinutes(0);

    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      this.addAppointmenttForm.get('doctor')?.setValue(doctor);
      const availableDay: number[] = [];
      doctor.doctorSchedules?.forEach((doctorSchedule: DoctorSchedule) => availableDay.push(doctorSchedule.day));
      this.disabledDays = [1,2,3,4,5,6,7].filter((num) => !availableDay.includes(num));
    });
    this.doctorSubject.subject?.attach(doctorObservable);

    const patientObservable = new GenericObserver<Patient>((patient: Patient) => this.addAppointmenttForm.get('patient')?.setValue(patient));
    this.patientSubject.subject?.attach(patientObservable);

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => this.addAppointmenttForm.get('time')?.setValue(time.add('s',0).utc().format()));
    this.appointmentTimeSubject.subject?.attach(timeAppointmentObservable);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.addAppointmenttForm.get('time')?.setValue(moment(appointmentModal.appointment?.time).add('s',0).utc().format()));
    this.appointmentModalSubject.subject?.attach(appointmentObservable);

   }

  ngOnInit(): void {
  }

  AddAppointment(event: any) {

      const appointment = this.addAppointmenttForm.value;
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        const appointmentModal = new AppointmentModal();
        appointmentModal.open = false;
        this.appointmentModalSubject.subject?.update(appointmentModal);
      });
  }

  selectDate(date: Date) {
    const momentDate = moment(date)
    this.appointmentTimeSubject.subject?.update(momentDate);
  }

}
