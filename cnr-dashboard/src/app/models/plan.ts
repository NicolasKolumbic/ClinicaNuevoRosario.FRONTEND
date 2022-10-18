import { HealthInsurance } from "./health-insurance";

export class Plan {
  id!: number;
  name!: string;
  healthInsurance!: HealthInsurance;

  get fullName() {
    return `${this.healthInsurance?.name} - ${this.name}`;
  }

  constructor(plan: Plan) {
    this.id = plan.id;
    this.name = plan.name;
    this.healthInsurance = plan.healthInsurance;
  }
}
