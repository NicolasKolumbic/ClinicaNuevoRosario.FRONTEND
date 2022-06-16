export class MedicalSpeciality {
  public id!: number;
  public name!: string;

  constructor(me: MedicalSpeciality) {
    this.id = me.id;
    this.name = me.name;
  }
}
