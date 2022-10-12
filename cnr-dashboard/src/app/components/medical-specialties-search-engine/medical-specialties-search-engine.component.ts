import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { DoctorListSubject } from 'src/app/patterns/observer/concrete-classes/doctors-list-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { MedicalSpecialitySubject } from 'src/app/patterns/observer/concrete-classes/medical-specialitity-subject';
import { Observer } from 'src/app/patterns/observer/interfaces/observer';
import { Subject } from 'src/app/patterns/observer/interfaces/subject';
import { DoctorService } from 'src/app/services/doctor.service';


@Component({
  selector: 'cnr-medical-specialties-search-engine',
  templateUrl: './medical-specialties-search-engine.component.html',
  styleUrls: ['./medical-specialties-search-engine.component.scss']
})
export class MedicalSpecialtiesSearchEngineComponent implements OnInit {

  medicalSpecialities: MedicalSpeciality[] = [];

  selectedMedicalSpeciality?: MedicalSpeciality;

  @Output() onSelectMedicalSpeciality: EventEmitter<MedicalSpeciality> = new EventEmitter<MedicalSpeciality>();

  constructor(
    private doctorService: DoctorService,
    private medicalSpecialitiesSubject: MedicalSpecialitySubject,
    private doctorListSubject: DoctorListSubject
  ) {
    const medicalSpecialityObservable = new GenericObserver<MedicalSpeciality>((medicalSpeciality: MedicalSpeciality) => this.selectedMedicalSpeciality = medicalSpeciality);
    this.medicalSpecialitiesSubject.subject?.attach(medicalSpecialityObservable);
  }

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
      this.onSelectMedicalSpeciality.emit(event.value);
      this.doctorService.getDoctorsByMedicalSpeciality(event.value.medicalSpecialtyId)
      .subscribe((doctors: Doctor[]) => this.doctorListSubject.subject?.update(doctors));
    }

  }


}
