import { MedicalSpeciality } from "./medical-speciality";
import { Plan } from "./plan";

export class SearchDoctor {
  public doctorCriteria?: string;
  public plan?: Plan;
  public medicalSpecialtyDto?: MedicalSpeciality;

  constructor() {
    this.plan = new Plan({id:0, name:''} as Plan);
    this.doctorCriteria = '';
    this.medicalSpecialtyDto = new MedicalSpeciality({medicalSpecialtyId:0, name:'asdfg'});
  }
}
