export class MedicalSpeciality {
  public medicalSpecialtyId!: number;
  public name!: string;

  constructor(me: any) {
    this.medicalSpecialtyId = me.medicalSpecialtyId;
    this.name = me.name;
  }
}
