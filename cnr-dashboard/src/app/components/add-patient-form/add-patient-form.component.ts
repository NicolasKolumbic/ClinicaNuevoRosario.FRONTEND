import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'cnr-add-patient-form',
  templateUrl: './add-patient-form.component.html',
  styleUrls: ['./add-patient-form.component.scss']
})
export class AddPatientFormComponent implements OnInit {

  cities: City[] = [];
  public addPatientForm: FormGroup;

  selectedCity!: City;

  constructor(private formBuilder: FormBuilder) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

this.addPatientForm = this.formBuilder.group({
  name: [''],
  lastName: [''],
  id: [null],
  phone: [null],
  healthInsurrance: [null],
  email: ['']
})

  }

  ngOnInit(): void {
  }

  AddPatient(e: any) {
    console.log(this.addPatientForm.value);
  }

}
