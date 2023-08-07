import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';
import * as moment from 'moment';
import { AppointmentStates } from 'src/app/helpers/enums/appointment-states';
import { KeyValue } from '@angular/common';
import { MedicalHistory } from 'src/app/models/clinical-history';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'cnr-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {

  @Input() appointment!: Appointment;
  public updatedAppointment: any = {
    appointmentState: 1,
    comment: ''
  };

  @Output() update: EventEmitter<any> = new EventEmitter();

  public appointmentState!: AppointmentStates;
  public comment!: string;
  public appointmentStateOptions: KeyValue<number,string>[] = [
    {key: 3, value: 'Finalizado'},
    {key: 4, value: 'Ausente'}
  ];
  public medicalHistories: MedicalHistory[] = []


  constructor(
    private subjectManagerService: SubjectManagerService,
    private patientService: PatientService,
  ) { }

  get appointmentTime() {
    if(this.appointment) {
      const appointmentDate = moment(this.appointment.time);
      return appointmentDate.format('DD/MM/YYYY HH:mm');
    } else {
      return '';
    }   
  }

  get isNotAssigned() {
    return this.appointment && this.appointment.appointmentState !== AppointmentStates.Asignado;
  }

  get healthInsurancePlan() {
    return this.appointment ? `${this.appointment.patient.plan.healthInsurance.name} - ${this.appointment.patient.plan.name}`:''
  }

  ngOnInit(): void {
    this.setAppointmentViewObservable();
  }

  setAppointmentViewObservable() {
    const appointmentSubject = new GenericSubject<AppointmentModal>('view-appointment-form-modal');
    const appointmentModalObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => {
      this.comment = '';
      this.appointment = appointmentModal.appointment!;
      this.patientService
      .getMedicalHistories(
        this.appointment.doctor.doctorId,
        this.appointment.patient.patientId
      ).subscribe((medicalHistories: MedicalHistory[]) => {
          this.medicalHistories = medicalHistories.sort((a: MedicalHistory, b: MedicalHistory) =>  b.medicalHistoryId - a.medicalHistoryId);
          
      });
    });
    appointmentSubject.attach(appointmentModalObservable);
    this.subjectManagerService.add(appointmentSubject);
  }

  selectAppointmentState({key}: any) {
    this.updatedAppointment.appointmentState = key;
    this.update.emit(this.updatedAppointment);
  }

  medicalHistoryChangeHandler(data: any) {
    this.updatedAppointment.comment = this.comment;
    this.update.emit(this.updatedAppointment);
  }

}
