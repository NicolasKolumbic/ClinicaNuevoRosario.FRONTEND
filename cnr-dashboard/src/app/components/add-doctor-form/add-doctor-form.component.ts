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

  doctorForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private doctorService: DoctorService,
    private medicalSpecialitySubject: MedicalSpecialitySubject
  ) {

    this.doctorForm = this.builder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.email],
      phoneNumber: [null, Validators.max(13)],
      identificationNumber: [null,Validators.required],
      medicalLicense: [null, Validators.required]
    });

    const medicalSpecialityObservable = new GenericObserver<MedicalSpeciality>((medicalSpeciality: MedicalSpeciality) => console.log(medicalSpeciality));

    this.medicalSpecialitySubject.subject.attach(medicalSpecialityObservable);
   }

  ngOnInit(): void {
  }

  addPersonalInformation(event: any) {
    const data = this.doctorForm.value;
    this.doctorService.addDoctor(data).subscribe(res => console.log(res));
  }

}
