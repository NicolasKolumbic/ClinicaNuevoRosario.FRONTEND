import { Appointment } from "src/app/models/appointment";
import { DoctorSchedule } from "src/app/models/doctor-schedule";

/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
 export interface Builder {
  generateAllDoctorWorkDays(day: string): void;
  generateAppointmentsByDay(doctorSchedule: DoctorSchedule, defaultDuration: number): void;
  generateAppointmentsTime(doctorSchedule: DoctorSchedule, defaultDuration: number): void;
  generateAppointmentEvents(): void;
  mergeWithRegisteredAppointment(appointments: Appointment[]): void;
}
