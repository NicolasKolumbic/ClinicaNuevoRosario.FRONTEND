import { Pipe, PipeTransform } from '@angular/core';
import { MedicalSpeciality } from '../models/medical-speciality';

@Pipe({
  name: 'medicalSpecialitiesList'
})
export class MedicalSpecialitiesListPipe implements PipeTransform {

  transform(medicalSpecialities: MedicalSpeciality[]): string {
    return medicalSpecialities.map((medicalSpeciality: MedicalSpeciality) => medicalSpeciality.name).join(', ');
  }

}
