import { AppointmentStates } from "../helpers/enums/appointment-states"
import { ServiceTypes } from "../helpers/enums/service-types"
import { Doctor } from "./doctor"
import { Patient } from "./patient"

export class Appointment {
  appointmentId!: number
  time!: string
  comments?: string
  patient!: Patient
  doctor!: Doctor
  appointmentState!: AppointmentStates
  serviceType!: ServiceTypes

  constructor(ap?: Appointment) {
    if(ap) {
      this.appointmentId = ap.appointmentId;
      this.comments = ap.comments;
      this.doctor = new Doctor(ap.doctor);
      this.patient = new Patient(ap.patient);
      this.time = ap.time;
      this.appointmentState = ap.appointmentState;
      this.serviceType = ap.serviceType;
    }

  }
}
