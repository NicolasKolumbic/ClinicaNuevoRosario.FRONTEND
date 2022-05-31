import { Component, OnInit } from '@angular/core';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'cnr-patient-search-engine',
  templateUrl: './patient-search-engine.component.html',
  styleUrls: ['./patient-search-engine.component.scss']
})
export class PatientSearchEngineComponent implements OnInit {

  cities: City[] = [];

  selectedCity!: City;

  constructor() {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];

   }

  ngOnInit(): void {
  }

}
