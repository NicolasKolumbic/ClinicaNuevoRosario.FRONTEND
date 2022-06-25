import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { MedicalSpecialitySubject } from 'src/app/patterns/observer/concrete-classes/medical-specialitity-subject';
import { Observer } from 'src/app/patterns/observer/interfaces/observer';
import { Subject } from 'src/app/patterns/observer/interfaces/subject';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cnr-doctor-search-engine',
  templateUrl: './doctor-search-engine.component.html',
  styleUrls: ['./doctor-search-engine.component.scss']
})
export class DoctorSearchEngineComponent implements Observer<Doctor[]> {

  private doctors?: Doctor[]= [];

  selectedDoctor?: Doctor;

  @Output() onSelectDoctor: EventEmitter<Doctor> = new EventEmitter();

  constructor(
    private doctorService: DoctorService,
    private medicalSpecialitiesSubject: MedicalSpecialitySubject,
    private doctorSubject: DoctorSubject
  ) {
      medicalSpecialitiesSubject.attach(this);
   }

  update(subject: Subject<Doctor[]>): void {
    this.doctors = subject.getState();
  }

  get doctorOptions(): any[] {
    return this.doctors as any[];
  }

  searchDoctor(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter.length > 3) {
      this.doctorService.search(value.filter)
      .subscribe((doctorsReponse: Doctor[]) => this.doctors = doctorsReponse);
    }
  }

  selectDoctor(event: any) {
    if(event.value) {
      this.doctorSubject.updateMedicalSpeciality(event.value.medicalSpecialties[0]);
      this.onSelectDoctor.emit(event.value);
    }
  }

}
