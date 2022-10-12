import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from '../../models/doctor';
import { Plan } from '../../models/plan';
import { AppointmentModalSubject } from 'src/app/patterns/observer/concrete-classes/appointment-modal-subject';
import { AppointmentSubject } from 'src/app/patterns/observer/concrete-classes/appointments-subject';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { SearchDoctor } from 'src/app/models/search-doctor';


@Component({
  selector: 'cnr-see-schedule-panel',
  templateUrl: './see-schedule-panel.component.html',
  styleUrls: ['./see-schedule-panel.component.scss']
})
export class SeeSchedulePanelComponent {

  public display: boolean = false;
  public doctor?: Doctor;
  public searchDoctorParams: SearchDoctor = new SearchDoctor();

  constructor(
    private appointmentService: AppointmentService,
    private appointmentSubject: AppointmentSubject,
    private appointmentModalSubject: AppointmentModalSubject,
    private doctorSubject: DoctorSubject
  ) {

    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => this.doctor = doctor);
    this.doctorSubject.subject?.attach(doctorObservable);

    const appointmentModalObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.display = appointmentModal.open);
    this.appointmentModalSubject.subject?.attach(appointmentModalObservable);
  }

  CloseModal(event: any) {
    this.display = false;
  }

  seeSchedule(event: any) {
    if(this.doctor && this.doctor.doctorSchedules && this.doctor.doctorSchedules.length > 0) {
      this.appointmentService.getAppointmentByDoctorId(this.doctor.doctorId)
                             .subscribe((appointments: Appointment[]) => {
                                if(this.doctor && this.doctor.doctorSchedules &&  this.doctor.doctorSchedules.length > 0){
                                  const events = this.appointmentService.generateEvents(this.doctor.doctorSchedules, this.doctor.appointmentDurationDefault, appointments);
                                  this.appointmentSubject.updateAppointments(events);
                                }
                              });

    }
  }

  selectHealthInsurancePlan(plan: Plan) {
    const searchDoctor =  new SearchDoctor();
    searchDoctor.doctorCriteria = this.searchDoctorParams.doctorCriteria;
    searchDoctor.medicalSpecialtyDto = this.searchDoctorParams.medicalSpecialtyDto;
    searchDoctor.plan = this.searchDoctorParams.plan;
    this.searchDoctorParams = searchDoctor;
  }

  selectMedicalSpeciality(medicalSpeciality: MedicalSpeciality) {
    this.searchDoctorParams.medicalSpecialtyDto = medicalSpeciality
  }

}
