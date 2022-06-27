import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { AppointmentEvent } from 'src/abstraction/appointment-event';
import { AppointmentSubject } from '../../patterns/observer/concrete-classes/appointments-subject';
import { Observer } from 'src/app/patterns/observer/interfaces/observer';
import { Subject } from 'src/app/patterns/observer/interfaces/subject';


@Component({
  selector: 'cnr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, Observer<AppointmentEvent[]> {

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
    dayMaxEvents: 7,
    moreLinkClick: 'popover',
    dateClick: this.handleDateClick.bind(this),
    events: [],
    eventClick: (appointment: EventClickArg) => console.log(appointment.event.title),
    slotLabelFormat: {
      hour:'2-digit',
      minute:'2-digit',
      hour12: true
    },
    slotDuration: '00:15',
    slotLabelInterval: '00:15'


  };

  constructor(private appointmentSubject: AppointmentSubject) {
    appointmentSubject.attach(this);
  }

  update(subject: Subject<AppointmentEvent[]>): void {
    const events = {events: subject.getState()};

    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
  }

  ngOnInit(): void {

  }

  handleDateClick(arg: any) {
    console.log(arg)
  }

}
