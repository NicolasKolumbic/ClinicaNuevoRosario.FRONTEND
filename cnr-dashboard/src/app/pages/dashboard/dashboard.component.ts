import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'cnr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public formCalendar!: FormGroup;


  constructor(private formBuilder: FormBuilder) {


   }

  ngOnInit(): void {
    this.formCalendar = this.formBuilder.group({
      date: ['']
    });
  }



}
