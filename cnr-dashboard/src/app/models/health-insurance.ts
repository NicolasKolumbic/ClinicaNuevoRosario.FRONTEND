import { Plan } from "./plan";

export class HealthInsurance {
  id!: number;
  name!: string;
  plans!: Plan[];

  constructor(healthInsurance: HealthInsurance) {
    this.id = healthInsurance.id;
    this.name = healthInsurance.name;
    this.plans = healthInsurance.plans;
  }
}
