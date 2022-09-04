import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'cnr-doctors-grid',
  templateUrl: './doctors-grid.component.html',
  styleUrls: ['./doctors-grid.component.scss']
})
export class DoctorsGridComponent implements OnInit {

  public doctors : Doctor[] = [];
  loading: boolean = false;

  @ViewChild('doctorsTable', {static: false}) table: any;

  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.doctorService.getAllDoctor().subscribe(doctors => this.doctors = doctors);
  }

  clear(table: any) {
    table.clear();
}

searchDoctor(event: any) {
  this.table.filterGlobal(event.target.value, 'contains')
}


}
