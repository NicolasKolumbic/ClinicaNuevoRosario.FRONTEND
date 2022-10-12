import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cnr-doctor-schedules-manager',
  templateUrl: './doctor-schedules-manager.component.html',
  styleUrls: ['./doctor-schedules-manager.component.scss']
})
export class DoctorSchedulesManagerComponent implements OnInit {

  selectedDay?: {[key: string]: string};
  daysOfWeek: {[key: string]: string}[] = [
    {
      key: "1",
      description: 'Lunes'
    },
    {
      key: "2",
      description: 'Martes'
    },
    {
      key: "3",
      description: 'Miércoles'
    },
    {
      key: "4",
      description: 'Jueves'
    },
    {
      key: "5",
      description: 'Viernes'
    },
    {
      key: "6",
      description: 'Sábado'
    },
    {
      key: "7",
      description: 'Domingo'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ChangeDay(event: any) {
    this.selectedDay = event;
  }

  addSchedule() {

  }

}
