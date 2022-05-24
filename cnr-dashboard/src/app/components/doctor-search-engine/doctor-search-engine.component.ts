import { Component, OnInit } from '@angular/core';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'cnr-doctor-search-engine',
  templateUrl: './doctor-search-engine.component.html',
  styleUrls: ['./doctor-search-engine.component.scss']
})
export class DoctorSearchEngineComponent implements OnInit {

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
