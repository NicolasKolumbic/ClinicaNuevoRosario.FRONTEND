import { MedicalHistory } from "./clinical-history";
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
  medicalHistories!: MedicalHistory[];
  identificationNumber!: number;
  healthInsurranceNumber!: number;

  constructor(patient: Patient) {
    this.patientId = patient.patientId || (patient as any).id;
    this.name = patient.name;
    this.lastname = patient.lastname;
    this.email = patient.email;
    this.phoneNumber = patient.phoneNumber;
    this.fullName = `${this.name} ${this.lastname}`;
    this.healthInsurance = patient.healthInsurance;
    this.plan = patient.plan;
    this.identificationNumber = patient.identificationNumber;
    this.healthInsurranceNumber = patient.healthInsurranceNumber;
    this.medicalHistories = patient.medicalHistories && patient.medicalHistories.map((medicalHistory: MedicalHistory) => new MedicalHistory(medicalHistory));
  }
}
