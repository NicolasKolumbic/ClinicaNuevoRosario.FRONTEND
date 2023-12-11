import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventClickArg, FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { AppointmentEvent } from 'src/abstraction/appointment-event';
import { Observer } from 'src/app/patterns/observer/interfaces/observer';
import { Subject } from 'src/app/patterns/observer/interfaces/subject';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Appointment } from 'src/app/models/appointment';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';
import * as moment from 'moment';
import { GenericSubject } from 'src/app/patterns/observer/concrete-classes/generic-subject';


@Component({
  selector: 'cnr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, Observer<AppointmentEvent[]> {

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
    eventClick: (appointmentEvent: EventClickArg) => {
        const appointmentModal = new AppointmentModal();
        const appointment = new Appointment();
        appointment.time = appointmentEvent.event.startStr;
        appointmentModal.appointment = appointment;
        appointmentModal.open = true;
        this.subjectManagerService.getSubjectByName('add-appointment-form-modal').update(appointmentModal);
    },
    customButtons: {
      next: {
        click: () => {
          this.#calendar.next();
          if(!this.monthWasLoaded(this.#calendar.view.currentStart)) {
            this.subject.update(this.#calendar.view.currentStart.toISOString());
          } else if(!this.monthWasLoaded(this.#calendar.view.currentEnd)) {
            this.subject.update(this.#calendar.view.currentEnd.toISOString());
          }
        }
      },
      prev: {
        click: () => {
          this.#calendar.prev();
          if(!this.monthWasLoaded(this.#calendar.view.currentStart)) {
            this.subject.update(this.#calendar.view.currentStart.toISOString());
          } else if(!this.monthWasLoaded(this.#calendar.view.currentEnd)) {
            this.subject.update(this.#calendar.view.currentEnd.toISOString());
          }
        }
      }
    },
    slotLabelFormat: {
      hour:'2-digit',
      minute:'2-digit',
      hour12: true
    },
    slotDuration: '00:15',
    slotLabelInterval: '00:15'


  };

  @ViewChild('calendar', {static: false}) calendarComponent!: FullCalendarComponent;

  #calendar!: Calendar;
  public events: AppointmentEvent[] = [];
  public subject: GenericSubject<string>;
  
  constructor(
    private subjectManagerService: SubjectManagerService

  ) {
    var appointmentSubject = subjectManagerService.getSubjectByName('appointment-events-form-modal')
    appointmentSubject.attach(this);

    this.subject =  this.subjectManagerService.getSubjectByName('appointment-calendar');
  }

  update(subject: Subject<AppointmentEvent[]>): void {
    const events = {events: subject.getState()};

    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
  }

  ngAfterViewInit(): void {
    this.#calendar = this.calendarComponent.getApi();
  }

  handleDateClick(arg: any) {
    console.log(arg)
  }

  private monthWasLoaded(date: Date) {
    return this.events.some((event: AppointmentEvent) => moment(event.start).month() === moment(date).month())
  }

}
