import { Component, OnInit } from '@angular/core';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { DoctorService } from 'src/app/services/doctor.service';


@Component({
  selector: 'cnr-medical-specialties-search-engine',
  templateUrl: './medical-specialties-search-engine.component.html',
  styleUrls: ['./medical-specialties-search-engine.component.scss']
})
export class MedicalSpecialtiesSearchEngineComponent implements OnInit {

  medicalSpecialities: MedicalSpeciality[] = [];

  selectedmedicalSpeciality!: MedicalSpeciality;

  constructor(private doctorService: DoctorService ) {

   }

  ngOnInit(): void {
    this.doctorService.getAllMedicalSpecialities()
    .subscribe(medicalSpecialities => this.medicalSpecialities = medicalSpecialities);
  }

}
