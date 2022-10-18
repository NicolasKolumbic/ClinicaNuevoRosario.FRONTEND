import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Patient } from 'src/app/models/patient';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

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
    private subjectManagerService: SubjectManagerService,
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

    /*const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      this.addAppointmenttForm.get('doctor')?.setValue(doctor);
      const availableDay: number[] = [];
      doctor.doctorSchedules?.forEach((doctorSchedule: DoctorSchedule) => availableDay.push(doctorSchedule.day));
      this.disabledDays = [1,2,3,4,5,6,7].filter((num) => !availableDay.includes(num));
    });*/
    // recibe el doctor seleccionado

    const patientObservable = new GenericObserver<Patient>((patient: Patient) => this.addAppointmenttForm.get('patient')?.setValue(patient));
    const patientSubject = new GenericSubject<Patient>('add-appointment-form-patient');
    patientSubject.attach(patientObservable);
    this.subjectManagerService.add(patientSubject);

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => this.addAppointmenttForm.get('time')?.setValue(time.add('s',0).utc().format()));
    const timeAppointmentSubject = new GenericSubject<moment.Moment>('add-appointment-form-time');
    timeAppointmentSubject.attach(timeAppointmentObservable);
    this.subjectManagerService.add(timeAppointmentSubject);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.addAppointmenttForm.get('time')?.setValue(moment(appointmentModal.appointment?.time).add('s',0).utc().format()));
    const appointmentSubject = new GenericSubject<AppointmentModal>('add-appointment-form-modal');
    appointmentSubject.attach(appointmentObservable);
    this.subjectManagerService.add(appointmentSubject);

   }

  ngOnInit(): void {
  }

  AddAppointment(event: any) {

      const appointment = this.addAppointmenttForm.value;
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        const appointmentModal = new AppointmentModal();
        appointmentModal.open = false;
        this.subjectManagerService.getSubjectByName('add-appointment-form-modal').update(appointmentModal);
      });
  }

  selectDate(date: Date) {
    const momentDate = moment(date)
    this.subjectManagerService.getSubjectByName('add-appointment-form-time').update(momentDate);
  }

}
