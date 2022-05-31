export class Doctor {
  doctorId!: number;
  medicalLicense!: string;
  name!: string;
  lastname!: string;
  email!: string;
  phoneNumber!: number;

  get fullName() {
    return `${this.name} ${this.lastname}`
  }

}
