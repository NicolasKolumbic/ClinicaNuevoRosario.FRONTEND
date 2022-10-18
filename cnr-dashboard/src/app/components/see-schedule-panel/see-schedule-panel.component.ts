import { ChangeDetectorRef, Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Doctor } from '../../models/doctor';
import { Plan } from '../../models/plan';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { SearchDoctor } from 'src/app/models/search-doctor';
import { SubjectManagerService } from '../../services/subject-manager.service';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';
import { DoctorService } from 'src/app/services/doctor.service';


@Component({
  selector: 'cnr-see-schedule-panel',
  templateUrl: './see-schedule-panel.component.html',
  styleUrls: ['./see-schedule-panel.component.scss']
})
export class SeeSchedulePanelComponent {

  public display: boolean = false;
  public doctor?: Doctor;
  public searchDoctorParams: SearchDoctor = new SearchDoctor();

  constructor(
    private appointmentService: AppointmentService,
    private subjectManagerService: SubjectManagerService,
    private doctorService: DoctorService,
    private cRef: ChangeDetectorRef
  ) {
      this.setAppointmentObservable();
      this.setDoctorCollectionObservable();
      this.setDoctorObservable();
      this.setMedicalSpecialityObservable();
      this.setHealthInsuranceObservable();
      this.setSearchDoctorObservable();
  }

  setSearchDoctorObservable() {
    const searchDoctorSubject = new GenericSubject<string>("panel-dashboard-search-doctor");
    const searchDoctorObservable = new GenericObserver<string>((text: string) => {
      this.searchDoctorParams.doctorCriteria = text;
      this.searchDoctor();
    });

    searchDoctorSubject.attach(searchDoctorObservable);
    this.subjectManagerService.add(searchDoctorSubject);
  }

  setDoctorObservable() {
    const doctorSubject = new GenericSubject<Doctor>("panel-dashboard-doctor");
    const doctorObservable = new GenericObserver<Doctor>((doctor: Doctor) => {
      this.doctor = doctor;
      this.cRef.detectChanges();
    });

    doctorSubject.attach(doctorObservable);
    this.subjectManagerService.add(doctorSubject);
  }

  setDoctorCollectionObservable() {
    const doctorCollectionSubject = new GenericSubject<Doctor[]>("panel-dashboard-doctor-collection");
    this.subjectManagerService.add(doctorCollectionSubject);
  }

  setMedicalSpecialityObservable() {
    const medicalSpecialitySubject = new GenericSubject<MedicalSpeciality>("panel-dashboard-medical-speciality");
    const medicalSpecialityObservable = new GenericObserver<MedicalSpeciality>((medicalSpeciality: MedicalSpeciality) => {
      this.searchDoctorParams.medicalSpecialtyDto = medicalSpeciality;
      this.searchDoctor();
    });

    medicalSpecialitySubject.attach(medicalSpecialityObservable);
    this.subjectManagerService.add(medicalSpecialitySubject);
  }

  setAppointmentObservable() {
    const appointmentSubject = new GenericSubject<AppointmentModal>('add-appointment-form-modal');
    const appointmentModalObservable = new GenericObserver<AppointmentModal>((appointmentModal: AppointmentModal) => this.display = appointmentModal.open);
    appointmentSubject.attach(appointmentModalObservable);
    this.subjectManagerService.add(appointmentSubject);
  }

  setHealthInsuranceObservable() {
    const healthInsurancePlanSubject = new GenericSubject<Plan>('see-schedule-health-insurrance');
    const healthInsurancePlanObservable = new GenericObserver<Plan>((plan: Plan) => {
      this.searchDoctorParams.plan = plan;
      this.searchDoctor();
    });
    healthInsurancePlanSubject.attach(healthInsurancePlanObservable);
    this.subjectManagerService.add(healthInsurancePlanSubject);
  }

  CloseModal(event: any) {
    this.display = false;
  }

  seeSchedule(event: any) {
    if(this.doctor && this.doctor.doctorSchedules && this.doctor.doctorSchedules.length > 0) {
      this.appointmentService.getAppointmentByDoctorId(this.doctor.doctorId)
                             .subscribe((appointments: Appointment[]) => {
                                if(this.doctor && this.doctor.doctorSchedules &&  this.doctor.doctorSchedules.length > 0){
                                  const events = this.appointmentService.generateEvents(this.doctor.doctorSchedules, this.doctor.appointmentDurationDefault, appointments);
                                  const appointmentSubject = this.subjectManagerService.getSubjectByName('add-appointment-form-modal');
                                  appointmentSubject.update(events);
                                }
                              });

    }
  }

  selectHealthInsurancePlan(plan: Plan) {
    const searchDoctor =  new SearchDoctor();
    searchDoctor.doctorCriteria = this.searchDoctorParams.doctorCriteria;
    searchDoctor.medicalSpecialtyDto = this.searchDoctorParams.medicalSpecialtyDto;
    searchDoctor.plan = this.searchDoctorParams.plan;
    this.searchDoctorParams = searchDoctor;
  }

  selectMedicalSpeciality(medicalSpeciality: MedicalSpeciality) {
    this.searchDoctorParams.medicalSpecialtyDto = medicalSpeciality
  }

  searchDoctor() {
    this.doctorService.searchDoctor(this.searchDoctorParams).subscribe((doctors: Doctor[]) => {
      this.subjectManagerService.getSubjectByName("panel-dashboard-doctor-collection").update(doctors)
    })
  }

}
