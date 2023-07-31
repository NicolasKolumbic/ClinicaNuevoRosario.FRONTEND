import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvironmentService } from './environment.service';
import { DoctorSchedule } from '../models/doctor-schedule';
import { AppointmentEvent } from '../../abstraction/appointment-event';
import { AppointmentEventBuilder } from '../patterns/builder/concrete-classes/appointment-event-builder';
import { Appointment } from '../models/appointment';
import { map } from 'rxjs/operators';
import { UpdatedAppointment } from '../models/updated-appointment';
import { HealthInsuranceReportRequest } from '../models/health-insurance-report-request';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  public getAppointmentByDoctorId(doctorId: number) {
    return this.http.get<any[]>(`${this.environmentService.baseUrl}v1/Appointment/GetAppointmentsByDoctorId?doctorId=${doctorId}`)
                    .pipe(
                      map((appointments: Appointment[]) => appointments.map((appointment: Appointment) => new Appointment(appointment)) )
                    );
  }

  public getAppointmentsByEmail(email: string) {
    return this.http.get<any[]>(`${this.environmentService.baseUrl}v1/Appointment/GetAppointmentsByEmail?email=${email}`)
                    .pipe(
                      map((appointments: Appointment[]) => appointments.map((appointment: Appointment) => new Appointment(appointment)) )
                    );
  }

  public generateEvents(schedules: DoctorSchedule[], defaultDuration: number, appointments: Appointment[], onlyActives?: boolean) {

    let events: AppointmentEvent[] = []

    schedules.forEach((doctorSchedule: DoctorSchedule) => {
      const appointmentEventsDirector = new AppointmentEventBuilder();
      appointmentEventsDirector.generateAllDoctorWorkDays(doctorSchedule.day.toFixed());
      appointmentEventsDirector.generateAppointmentsByDay(doctorSchedule, defaultDuration);
      appointmentEventsDirector.generateAppointmentsTime(doctorSchedule, defaultDuration);
      appointmentEventsDirector.generateAppointmentEvents();
      appointmentEventsDirector.mergeWithRegisteredAppointment(appointments);

      if(onlyActives) {
        appointmentEventsDirector.filterActiveAppointments();
      }
      events = events.concat(appointmentEventsDirector.getEvents());
    });

    return events;
  }

  public addAppointment(command: Appointment) {
    return this.http.post<number>(`${this.environmentService.baseUrl}v1/Appointment/AddAppointment`, command);
  }

  public updateAppointment(updatedAppointment: UpdatedAppointment) {
    return this.http.put<number>(`${this.environmentService.baseUrl}v1/Appointment/UpdateAppointment`, updatedAppointment);
  }

  public getAppointmentById(appointmentId: string) {
    return this.http.get<Appointment>(
      `${this.environmentService.baseUrl}v1/Appointment/GetAppointmentsById?appointmentId=${appointmentId}`
    ).pipe(
      map((appointment: any) => new Appointment(appointment) )
    );
  }

  public getAllAppointments() {
    return this.http.get<Appointment[]>(
      `${this.environmentService.baseUrl}v1/Appointment/GetAllAppointments`
    ).pipe(
      map((appointments: any[]) => appointments.map((appointment: Appointment) => new Appointment(appointment)) )
    );
  }

  public generateReport(request: HealthInsuranceReportRequest) {
    return this.http.post(`${this.environmentService.baseUrl}v1/Appointment/ReportGenerator`,request, { responseType: 'blob'});
  }



}


