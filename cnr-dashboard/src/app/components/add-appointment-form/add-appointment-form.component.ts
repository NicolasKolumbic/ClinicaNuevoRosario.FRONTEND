import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'cnr-add-appointment-form',
  templateUrl: './add-appointment-form.component.html',
  styleUrls: ['./add-appointment-form.component.scss']
})
export class AddAppointmentFormComponent implements OnInit {

  cities: City[] = [];
  public addAppointmenttForm: FormGroup;
  public today: Date = new Date(Date.now());

  selectedCity!: City;

  constructor(private formBuilder: FormBuilder) {
    this.addAppointmenttForm = this.formBuilder.group({
      time: [''],
      patient: [''],
      doctor: [''],
    })

   }

  ngOnInit(): void {
  }

  AddAppointment(event: any) {

  }

}
