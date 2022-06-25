import { AppointmentEvent } from "src/abstraction/appointment-event";

export class RegisteredAppointmentEvent implements AppointmentEvent {
  start!: string;
  end!: string;
  title!: string;
  backgroundColor: string = '#23b5d3';
  borderColor: string = '#23b5d3';

  constructor(appointmentStart: string, appointmentEnd: string, title: string) {
    this.start = appointmentStart;
    this.end = appointmentEnd;
    this.title = title;
  }

}
