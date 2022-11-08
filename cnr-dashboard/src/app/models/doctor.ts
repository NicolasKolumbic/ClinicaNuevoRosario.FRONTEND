import { DoctorSchedule } from "./doctor-schedule";
import { MedicalSpeciality } from "./medical-speciality";
import { Plan } from "./plan";

export class Doctor {
  doctorId!: number;
  medicalLicense!: string;
  name!: string;
  lastname!: string;
  email!: string;
  phoneNumber!: number;
  appointmentDurationDefault!: number;
  fullName!: string;
  medicalSpecialties!: MedicalSpeciality[];
  doctorSchedules?: DoctorSchedule[];
  plans!: Plan[];

  constructor(doctor: Doctor) {
    this.doctorId = doctor.doctorId;
    this.medicalLicense = doctor.medicalLicense;
    this.name = doctor.name;
    this.lastname = doctor.lastname;
    this.email = doctor.email;
    this.phoneNumber = doctor.phoneNumber;
    this.appointmentDurationDefault = doctor.appointmentDurationDefault;
    this.fullName = `${this.name} ${this.lastname}`;
    this.medicalSpecialties = doctor.medicalSpecialties.map(ms => new MedicalSpeciality(ms));
    this.doctorSchedules = doctor.doctorSchedules?.map(ds => new DoctorSchedule(ds));
    this.plans = doctor.plans;
  }

}
