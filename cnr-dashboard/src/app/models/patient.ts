export class Pantient {
  doctorId!: number;
  name!: string;
  lastname!: string;
  email!: string;
  phoneNumber!: number;

  get fullName() {
    return `${this.name} ${this.lastname}`
  }
}
