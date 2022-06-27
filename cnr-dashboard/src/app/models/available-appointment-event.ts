import { AppointmentEvent } from "../../abstraction/appointment-event";

export class AvailableAppointmentEvent implements AppointmentEvent {
  start!: string;
  end!: string;
  title: string = 'Turnos Disponible';
  backgroundColor: string = '#a2aebb';
  borderColor: string = '#dfe0e2'

  constructor(appointmentStart: string, appointmentEnd: string) {
    this.start = appointmentStart;
    this.end = appointmentEnd;
  }
}
