import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'cnr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    dayHeaderFormat: {weekday: 'long'},
    headerToolbar: {
      start: 'title',
      center: 'prev,next,today',
      end: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    titleFormat: {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    },
    nowIndicator: true,
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2022-05-21' },
      { title: 'event 2', date: '2022-05-22' }
    ]

  };

  constructor() { }

  ngOnInit(): void {
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

}
