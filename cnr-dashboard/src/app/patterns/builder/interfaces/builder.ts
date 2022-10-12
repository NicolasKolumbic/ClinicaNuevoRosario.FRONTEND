import { Appointment } from "src/app/models/appointment";
import { DoctorSchedule } from "src/app/models/doctor-schedule";

/**
 * La interfaz Builder determina por pasos la construcción del arreglo de "AppointmentEvents".
 *
 */
 export interface Builder {
  generateAllDoctorWorkDays(day: string): void;
  generateAppointmentsByDay(doctorSchedule: DoctorSchedule, defaultDuration: number): void;
  generateAppointmentsTime(doctorSchedule: DoctorSchedule, defaultDuration: number): void;
  generateAppointmentEvents(): void;
  mergeWithRegisteredAppointment(appointments: Appointment[]): void;
}
