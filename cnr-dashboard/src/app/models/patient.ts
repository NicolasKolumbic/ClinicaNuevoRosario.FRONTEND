import { HealthInsurance } from "./health-insurance";
import { Plan } from "./plan";

export class Patient {
  patientId!: number;
  name!: string;
  lastname!: string;
  email!: string;
  phoneNumber!: number;
  fullName!: string;
  healthInsurance!: HealthInsurance;
  plan!: Plan;

  constructor(patient: Patient) {
    this.patientId = patient.patientId;
    this.name = patient.name;
    this.lastname = patient.lastname;
    this.email = patient.email;
    this.phoneNumber = patient.phoneNumber;
    this.fullName = `${this.name} ${this.lastname}`;
    this.healthInsurance = patient.healthInsurance;
    this.plan = patient.plan;

  }
}
