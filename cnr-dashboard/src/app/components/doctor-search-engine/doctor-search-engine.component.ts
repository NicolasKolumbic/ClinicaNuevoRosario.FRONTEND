import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

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

  private doctors?: Doctor[]= [];

  selectedDoctor?: Doctor;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {

  }

  get doctorOptions(): any[] {
    return this.doctors as any[];
  }

  searchDoctor(value: {originalEvnet: any, filter: string}) {
    if(value && value.filter.length > 3) {
      this.doctorService.search(value.filter)
      .subscribe((doctorsReponse: Doctor[]) => this.doctors = doctorsReponse);
    }
  }

  filterDoctor(value: any) {
    console.log("Filter Doctor");
  }

}
