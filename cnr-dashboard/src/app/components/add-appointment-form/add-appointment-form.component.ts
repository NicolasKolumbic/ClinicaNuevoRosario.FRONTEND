import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from 'src/app/models/doctor';
import { DoctorSchedule } from 'src/app/models/doctor-schedule';
import { Patient } from 'src/app/models/patient';
import { SearchDoctor } from 'src/app/models/search-doctor';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';

@Component({
  selector: 'cnr-add-appointment-form',
  templateUrl: './add-appointment-form.component.html',
  styleUrls: ['./add-appointment-form.component.scss']
})
export class AddAppointmentFormComponent {

  public addAppointmenttForm: FormGroup;
  public today!: Date;
  public defaultDate!: Date;
  public disabledDays!: number[];
  public doctor!: Doctor;
  public searchDoctorParams: SearchDoctor = new SearchDoctor();

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private subjectManagerService: SubjectManagerService,
    private doctorService: DoctorService,
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

    this.setSearchDoctorObservable();

    const doctorSubject = this.subjectManagerService.getSubjectByName<any>('panel-dashboard-doctor');
    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      this.doctor = doctor;
      this.addAppointmenttForm.get('doctor')?.setValue(doctor);
      const availableDay: number[] = [];
      doctor.doctorSchedules?.forEach((doctorSchedule: DoctorSchedule) => availableDay.push(doctorSchedule.day));
      this.disabledDays = [1,2,3,4,5,6,7].filter((num) => !availableDay.includes(num));
    })
    doctorSubject.attach(doctorObservable)

    const timeAppointmentObservable = new GenericObserver<moment.Moment>((time: moment.Moment) => {
      this.addAppointmenttForm.get('time')?.setValue(time.format())
    });
    const timeAppointmentSubject = new GenericSubject<moment.Moment>('add-appointment-form-time');
    timeAppointmentSubject.attach(timeAppointmentObservable);
    this.subjectManagerService.add(timeAppointmentSubject);

    const appointmentObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.addAppointmenttForm.get('time')?.setValue(moment(appointmentModal.appointment?.time).add('s',0).utc().format()));
    const appointmentSubject = new GenericSubject<AppointmentModal>('add-appointment-form-modal');
    appointmentSubject.attach(appointmentObservable);
    this.subjectManagerService.add(appointmentSubject);


   }


  setSearchDoctorObservable() {
    const searchDoctorSubject = new GenericSubject<string>("add-appointment-form-search-doctor");
    const searchDoctorObservable = new GenericObserver<string>((text: string) => {
      this.searchDoctorParams.doctorCriteria = text;
      this.searchDoctor();
    });

    searchDoctorSubject.attach(searchDoctorObservable);
    this.subjectManagerService.add(searchDoctorSubject);
  }

  addAppointment(event: any) {
      const appointment = this.addAppointmenttForm.value;
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        const appointmentModal = new AppointmentModal();
        appointmentModal.open = false;
        this.subjectManagerService.getSubjectByName('add-appointment-form-modal').update(appointmentModal);
      });
  }

  selectDate(date: Date) {
    const momentDate = moment(date);
    this.subjectManagerService.getSubjectByName('add-appointment-form-time').update(momentDate);
  }

  searchDoctor() {
    this.doctorService.searchDoctor(this.searchDoctorParams).subscribe((doctors: Doctor[]) => {
      this.subjectManagerService.getSubjectByName("panel-dashboard-doctor-collection").update(doctors)
    })
  }

  selectPatient(patient: Patient) {
    this.addAppointmenttForm.get('patient')?.setValue(patient)
  }

}
