import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvironmentService } from './environment.service';
import { DoctorSchedule } from '../models/doctor-schedule';
import { AppointmentEvent } from '../../abstraction/appointment-event';
import { AppointmentEventBuilder } from '../patterns/builder/concrete-classes/appointment-event-builder';
import { Appointment } from '../models/appointment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  getAppointmentByDoctorId(doctorId: number) {
    return this.http.get<any[]>(`${this.environmentService.baseUrl}v1/Appointment/GetAppointmentsByDoctorId?doctorId=${doctorId}`)
                    .pipe(
                      map((appointments: Appointment[]) => appointments.map((appointment: Appointment) => new Appointment(appointment)) )
                    );
  }

  public generateEvents(schedules: DoctorSchedule[], defaultDuration: number, appointments: Appointment[]) {

    let events: AppointmentEvent[] = []

    schedules.forEach((doctorSchedule: DoctorSchedule) => {
      const appointmentEventsDirector = new AppointmentEventBuilder();
      appointmentEventsDirector.generateAllDoctorWorkDays(doctorSchedule.day.toFixed());
      appointmentEventsDirector.generateAppointmentsByDay(doctorSchedule, defaultDuration);
      appointmentEventsDirector.generateAppointmentsTime(doctorSchedule, defaultDuration);
      appointmentEventsDirector.generateAppointmentEvents();
      appointmentEventsDirector.mergeWithRegisteredAppointment(appointments)
      events = events.concat(appointmentEventsDirector.getEvents());
    });

    return events;
  }




}


