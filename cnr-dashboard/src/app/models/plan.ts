export class Plan {
  id!: number;
  name!: string;

  constructor(plan: Plan) {
    this.id = plan.id;
    this.name = plan.name;

  }
}
