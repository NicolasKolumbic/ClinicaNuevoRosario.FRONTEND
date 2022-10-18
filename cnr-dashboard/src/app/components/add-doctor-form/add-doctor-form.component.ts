import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private doctorService: DoctorService
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
