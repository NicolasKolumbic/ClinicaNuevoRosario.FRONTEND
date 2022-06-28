import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AppointmentSubject } from 'src/app/patterns/observer/concrete-classes/appointments-subject';
import { DoctorSubject } from 'src/app/patterns/observer/concrete-classes/doctor-subject';
import { DoctorListSubject } from 'src/app/patterns/observer/concrete-classes/doctors-list-subject';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { MedicalSpecialitySubject } from 'src/app/patterns/observer/concrete-classes/medical-specialitity-subject';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cnr-doctor-search-engine',
  templateUrl: './doctor-search-engine.component.html',
  styleUrls: ['./doctor-search-engine.component.scss']
})
export class DoctorSearchEngineComponent {

  private doctors?: Doctor[]= [];

  selectedDoctor?: Doctor;

  @Output() onSelectDoctor: EventEmitter<Doctor> = new EventEmitter();

  constructor(
    private doctorService: DoctorService,
    private medicalSpecialitiesSubject: MedicalSpecialitySubject,
    private doctorSubject: DoctorSubject,
    private appointmentSubject: AppointmentSubject,
    private doctorListSubject: DoctorListSubject,
    private cdRef: ChangeDetectorRef
  ) {
    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      if(this.selectedDoctor === null) {
        this.selectedDoctor = doctor;
        this.cdRef.detectChanges();
      }

    });
    this.doctorSubject.subject?.attach(doctorObservable);

    const doctorListObservable = new GenericObserver<Doctor[]>((doctors: Doctor[]) => {
      this.doctors = doctors;
      this.cdRef.detectChanges();
    });
    this.doctorListSubject.subject?.attach(doctorListObservable);
   }

  get doctorOptions(): any[] {
    return this.doctors as any[];
  }

  searchDoctor(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter.length > 3) {
      this.doctorService.search(value.filter)
      .subscribe((doctorsReponse: Doctor[]) => {
        this.doctors = doctorsReponse;
        this.doctorListSubject.subject?.update(doctorsReponse);
      });
    }
  }

  selectDoctor(doctor: Doctor) {
    if(doctor) {
      this.appointmentSubject.updateAppointments([]);
      if(doctor && doctor.medicalSpecialties && doctor.medicalSpecialties.length > 0) {
        this.medicalSpecialitiesSubject?.subject.update(doctor.medicalSpecialties[0]);
      }
      this.doctorSubject.subject?.update(doctor);
      this.onSelectDoctor.emit(doctor);
    }
  }

}
