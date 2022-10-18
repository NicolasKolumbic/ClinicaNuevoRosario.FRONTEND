import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cnr-doctor-search-engine',
  templateUrl: './doctor-search-engine.component.html',
  styleUrls: ['./doctor-search-engine.component.scss']
})
export class DoctorSearchEngineComponent implements OnInit {

  private doctors?: Doctor[]= [];

  selectedDoctor?: Doctor;

  @Input() doctorSubjectName!: string;
  @Input() doctorOptionsSubjectName!: string;
  @Input() searchDoctorSubjectName!: string;
  @Input() set doctor(value: Doctor) {
    this.selectedDoctor = value;
  }

  @Output() onSelectDoctor: EventEmitter<Doctor> = new EventEmitter();

  constructor(
    private doctorService: DoctorService,
    private subjectManagerService: SubjectManagerService
  ) {
   }

  get doctorOptions(): any[] {
    return this.doctors as any[];
  }

  ngOnInit(): void {
    const doctorCollection = new GenericObserver<Doctor[]>((doctors: Doctor[]) => {
      this.doctors = doctors
    });
    this.subjectManagerService.getSubjectByName(this.doctorOptionsSubjectName).attach(doctorCollection);
  }

  searchDoctor(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter.length > 3) {
      this.subjectManagerService.getSubjectByName(this.searchDoctorSubjectName).update(value.filter);
    }
  }

  selectDoctor(doctor: Doctor) {
    if(doctor) {
      const appointmentSubject = this.subjectManagerService.getSubjectByName<any>(this.doctorSubjectName);
      appointmentSubject.update([]);
      if(doctor && doctor.medicalSpecialties && doctor.medicalSpecialties.length > 0) {
        // enviar especialidades medicas
      }
      this.selectedDoctor = doctor;
      const doctorSubject = this.subjectManagerService.getSubjectByName<Doctor>(this.doctorSubjectName);
      doctorSubject.update(doctor);
      this.onSelectDoctor.emit(doctor);
    }
  }

}
