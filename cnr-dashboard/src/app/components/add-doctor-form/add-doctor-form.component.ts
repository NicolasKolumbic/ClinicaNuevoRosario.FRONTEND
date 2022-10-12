import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalSpeciality } from 'src/app/models/medical-speciality';
import { GenericObserver } from 'src/app/patterns/observer/concrete-classes/generic-observer';
import { MedicalSpecialitySubject } from '../../patterns/observer/concrete-classes/medical-specialitity-subject';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cnr-add-doctor-form',
  templateUrl: './add-doctor-form.component.html',
  styleUrls: ['./add-doctor-form.component.scss']
})
export class AddDoctorFormComponent implements OnInit {

  personalInformationForm!: FormGroup;
  profesionalInformationForm!: FormGroup;
  public photo!: string;


  constructor(
    private builder: FormBuilder,
    private doctorService: DoctorService,
    private medicalSpecialitySubject: MedicalSpecialitySubject
  ) {

    this.personalInformationForm = this.builder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.email],
      phoneNumber: [null, Validators.max(13)],
      identificationNumber: [null, Validators.required],

    });

    this.profesionalInformationForm = this.builder.group({
      medicalLicense: [null, Validators.required],
      appointmentDuration: [15],
      MedicalSpecialities: []
    })

    const medicalSpecialityObservable = new GenericObserver<MedicalSpeciality>((medicalSpeciality: MedicalSpeciality) => console.log(medicalSpeciality));

    this.medicalSpecialitySubject.subject.attach(medicalSpecialityObservable);
  }

  ngOnInit(): void {
  }

  addPersonalInformation(event: any) {
    const data = this.personalInformationForm.value;
    this.doctorService.addDoctor(data).subscribe(res => console.log(res));
  }

  setPhoto(photo: string) {
    this.photo = photo;
  }

  addMedicalSpeciality() {

  }

}
