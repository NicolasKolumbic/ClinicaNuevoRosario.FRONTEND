import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { DoctorService } from 'src/app/services/doctor.service';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';


@Component({
  selector: 'cnr-medical-specialties-search-engine',
  templateUrl: './medical-specialties-search-engine.component.html',
  styleUrls: ['./medical-specialties-search-engine.component.scss']
})
export class MedicalSpecialtiesSearchEngineComponent implements OnInit {

  medicalSpecialities: MedicalSpeciality[] = [];

  selectedMedicalSpeciality?: MedicalSpeciality;

  @Input() medicalSpecialitySubjectName!: string;
  @Input() medicalSpecialityOptionsSubjectName!: string;
  @Input() set medicalSpeciality(value: MedicalSpeciality){
    this.selectedMedicalSpeciality = value;
  }

  @Output() onSelectMedicalSpeciality: EventEmitter<MedicalSpeciality> = new EventEmitter<MedicalSpeciality>();

  constructor(
    private doctorService: DoctorService,
    private subjectManagerService: SubjectManagerService

  ) {}

  ngOnInit(): void {
    this.doctorService.allMedicalSpeacilities()
      .subscribe((medicalSpecialities: MedicalSpeciality[]) => {
        this.medicalSpecialities = medicalSpecialities;
      });
  }

  get medicalSpecialitiesOptions(): any[] {
    return this.medicalSpecialities as any[];
  }

  public ChangeMedicalSpeciality(event: any) {
    if(event.value) {
      this.selectedMedicalSpeciality = event.value;
      this.onSelectMedicalSpeciality.emit(event.value);
      this.subjectManagerService.getSubjectByName(this.medicalSpecialitySubjectName).update(event.value);
    }
  }
}
