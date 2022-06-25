import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { AppointmentSubject } from 'src/app/patterns/observer/concrete-classes/appointments-subject';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'cnr-see-schedule-panel',
  templateUrl: './see-schedule-panel.component.html',
  styleUrls: ['./see-schedule-panel.component.scss']
})
export class SeeSchedulePanelComponent implements OnInit {

  public display: boolean = false;
  public doctor?: Doctor;

  constructor(
    private appointmentService: AppointmentService,
    private appointmentSubject: AppointmentSubject
  ) { }

  ngOnInit(): void {
  }

  CloseModal(event: any) {
    this.display = false;
  }

  assignDoctor(doctor: Doctor) {
    this.doctor = doctor;
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

}
