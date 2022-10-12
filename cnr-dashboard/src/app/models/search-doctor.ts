import { MedicalSpeciality } from "./medical-speciality";
import { Plan } from "./plan";

export class SearchDoctor {
  public doctorCriteria?: string;
  public plan?: Plan;
  public medicalSpecialtyDto?: MedicalSpeciality;
}
