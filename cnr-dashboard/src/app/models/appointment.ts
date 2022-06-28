import { Doctor } from "./doctor"
import { HealthInsurance } from "./health-insurance"
import { Patient } from "./patient"

export class Appointment {
  appointmentId!: number
  time!: string
  comments?: string
  patient!: Patient
  doctor!: Doctor

  constructor(ap?: Appointment) {
    if(ap) {
      this.appointmentId = ap.appointmentId;
      this.comments = ap.comments;
      this.doctor = new Doctor(ap.doctor);
      this.patient = new Patient(ap.patient);
      this.time = ap.time;
    }

  }
}
