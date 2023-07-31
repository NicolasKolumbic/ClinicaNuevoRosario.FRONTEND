
export class HealthInsurance {
  id!: number;
  name!: string;

  constructor(healthInsurance: HealthInsurance) {
    this.id = healthInsurance.id;
    this.name = healthInsurance.name;
  }
}
