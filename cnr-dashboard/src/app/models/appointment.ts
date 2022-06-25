import { Doctor } from "./doctor"
import { HealthInsurance } from "./health-insurance"
import { Patient } from "./patient"

export class Appointment {
  appointmentId!: number
  time!: string
  comments?: string
  healthInsurance!: HealthInsurance
  patient!: Patient
  doctor!: Doctor

  constructor(ap: Appointment) {
    this.appointmentId = ap.appointmentId;
    this.comments = ap.comments;
    this.doctor = new Doctor(ap.doctor);
    this.healthInsurance = ap.healthInsurance;
    this.patient = new Patient(ap.patient);
    this.time = ap.time;
  }
}
