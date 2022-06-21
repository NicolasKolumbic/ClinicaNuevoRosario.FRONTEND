import { MedicalSpeciality } from "./medical-speciality";

export class Doctor {
  doctorId!: number;
  medicalLicense!: string;
  name!: string;
  lastname!: string;
  email!: string;
  phoneNumber!: number;
  fullName!: string;
  medicalSpeciality!: MedicalSpeciality;

  constructor(doctor: Doctor) {
    this.doctorId = doctor.doctorId;
    this.medicalLicense = doctor.medicalLicense;
    this.name = doctor.name;
    this.lastname = doctor.lastname;
    this.email = doctor.email;
    this.phoneNumber = doctor.phoneNumber;
    this.fullName = `${this.name} ${this.lastname}`;
    this.medicalSpeciality = doctor.medicalSpeciality;
  }

}
