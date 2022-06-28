import { AppointmentEvent } from "src/abstraction/appointment-event";
import * as moment from 'moment';
import { DoctorSchedule } from "src/app/models/doctor-schedule";
import { Builder } from "../interfaces/builder";
import { Appointment } from "src/app/models/appointment";
import { GenericCollection } from "../../iterator/concrete-classes/generic-collection";
import { AvailableAppointmentEvent } from "src/app/models/available-appointment-event";
import { RegisteredAppointmentEvent } from "src/app/models/registered-appointment-event";

export class AppointmentEventBuilder implements Builder {

  private availableAppointmentEvent!: AppointmentEvent[];
  private oneHourInMinutes: number = 60;
  private timeFormat: string = 'yyyy-MM-DD HH:mm:ss';

  private timeCollection: GenericCollection<moment.Moment> = new GenericCollection<moment.Moment>();
  private appointmentsDateCollection: GenericCollection<GenericCollection<string>> = new GenericCollection<GenericCollection<string>>();
  private appointmentsByDay!: number;

  constructor() {
    this.reset();
  }

  reset() {
    this.availableAppointmentEvent = [];
    this.appointmentsByDay = 0;
    this.timeCollection = new GenericCollection<moment.Moment>();
    this.appointmentsDateCollection = new GenericCollection<GenericCollection<string>>();
  }

  mergeWithRegisteredAppointment(appointments: Appointment[]): void {
      const registeredAppointmentEvents = appointments.map((appointment: Appointment) => {
          const appointmentEventStart = moment(appointment.time).set('s',0).format(this.timeFormat).toString();
          const appointmentEvent = new RegisteredAppointmentEvent(appointmentEventStart, appointmentEventStart, appointment.patient.fullName);
          return appointmentEvent
      });

      this.availableAppointmentEvent = this.availableAppointmentEvent.map((appointmentEvent: AppointmentEvent) => {
          const toReplace = registeredAppointmentEvents.find((registeredAppointmentEvent: AppointmentEvent) => registeredAppointmentEvent.start == appointmentEvent.start);
          if(toReplace != null) {
            toReplace.end = appointmentEvent.end;
            return toReplace;
          }
          return appointmentEvent;
      })
  }

  generateAllDoctorWorkDays(day: string): void {
    const availableDay = moment().startOf('month').day(day);

    if (availableDay.date() > 7) {
      availableDay.add(7,'d');
    }

    var month = availableDay.month();

    while(month === availableDay.month()){
        this.timeCollection.addItem(moment(availableDay.toString()));
        availableDay.add(7,'d');
    }
  }

  generateAppointmentsByDay(doctorSchedule: DoctorSchedule, defaultDuration: number): void {
      const appointmentDuration = (doctorSchedule.appointmentDuration ?? defaultDuration);
      this.appointmentsByDay = ((doctorSchedule.endTime - doctorSchedule.startTime) * this.oneHourInMinutes) / appointmentDuration;
  }

  generateAppointmentsTime(doctorSchedule: DoctorSchedule, defaultDuration: number): void {

    const timeCollectionIterator = this.timeCollection.getIterator();

    while(timeCollectionIterator.valid()) {
      const appointment = timeCollectionIterator.next();
      const appointmentDuration = doctorSchedule.appointmentDuration ?? defaultDuration;
      const timeScheduleCollection: GenericCollection<string> = new GenericCollection<string>();
      let counter = 0;

      while (counter <= this.appointmentsByDay) {
        const storedMinutes = counter ===  0 ? (doctorSchedule.startTime * this.oneHourInMinutes) : appointmentDuration;
        const appointmentTime = appointment.add(storedMinutes,'minutes');
        timeScheduleCollection.addItem(appointmentTime.format(this.timeFormat).toString());
        counter++;
      }

      this.appointmentsDateCollection.addItem(timeScheduleCollection);
    }
  }

  generateAppointmentEvents(): void {
    const appointmentsDateIterator = this.appointmentsDateCollection.getIterator();

    while (appointmentsDateIterator.valid()) {
        const appointmentTimeCollection: GenericCollection<string> = appointmentsDateIterator.next();
        const appointmentTimeIterator = appointmentTimeCollection.getIterator();
        while(appointmentTimeIterator.valid() && appointmentTimeIterator.isAvailableNext()) {
          const appointmentTimeStart = appointmentTimeIterator.next();
          const nextKey = appointmentTimeIterator.key();
          const appointmentTimeEnd = appointmentTimeIterator.next(nextKey);
          const appointmentEvent = new AvailableAppointmentEvent(appointmentTimeStart, appointmentTimeEnd);
          this.availableAppointmentEvent.push(appointmentEvent);
        }
    }
  }

  getEvents() {
    const result = this.availableAppointmentEvent;
    this.reset();
    return result;
  }

}
