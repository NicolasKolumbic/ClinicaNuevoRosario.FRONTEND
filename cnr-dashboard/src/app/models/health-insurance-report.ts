import { ServiceTypes } from "../helpers/enums/service-types";
import { Appointment } from "./appointment";

export class HealthInsuranceReport {
        public patientFullName!: string;
        public healthInsuranceNumber!: number;
        public date!: string;
        public plan!: string;
        public healthInsuranceName!: string;
        public profesionalFullName!: string;
        public serviceType!: string;

        constructor(appointment: Appointment) {
            this.patientFullName = appointment.patient.fullName;
            this.healthInsuranceName = appointment.patient.plan.healthInsurance.name;
            this.healthInsuranceNumber = appointment.patient.healthInsurranceNumber;
            this.date = appointment.time;
            this.plan = appointment.patient.plan.name;
            this.profesionalFullName = appointment.doctor.fullName;
            this.serviceType = ServiceTypes[appointment.serviceType];
            
        }
}