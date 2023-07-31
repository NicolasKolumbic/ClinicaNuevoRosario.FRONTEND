import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { AppointmentModal } from 'src/app/models/appointment-modal';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { forkJoin } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { SubjectManagerService } from 'src/app/services/subject-manager.service';
import { AppointmentStates } from 'src/app/helpers/enums/appointment-states';
import { UpdatedAppointment } from 'src/app/models/updated-appointment';
import { UserData } from 'src/app/models/user-data';

@Component({
  selector: 'cnr-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

  public display: boolean = false;
  public appointment!: Appointment;
  public updatedAppointment = new UpdatedAppointment();
  public comment?: string;
  public user!: UserData;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
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
    events: [],
    eventClick: (appointmentEvent: EventClickArg) => {
        this.appointmentService.getAppointmentById(appointmentEvent.event.id).subscribe((appointment: Appointment) => {
          const appointmentModal = new AppointmentModal();
          appointment.time = appointmentEvent.event.startStr;
          appointmentModal.appointment = appointment;
          appointmentModal.open = true;
          this.display = true;
          this.appointment = appointment;
          this.subjectManagerService.getSubjectByName('view-appointment-form-modal').update(appointmentModal); 
        })

    },
    slotLabelFormat: {
      hour:'2-digit',
      minute:'2-digit',
      hour12: true
    },
    slotDuration: '00:15',
    slotLabelInterval: '00:15'
  };

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private subjectManagerService: SubjectManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({user}) => {
        this.user = user;
        this.loadAppointments();
    })
  }
  
  loadAppointments() {

    forkJoin([
      this.appointmentService.getAppointmentsByEmail(this.user.email),
      this.doctorService.getDoctorByEmail(this.user.email)
    ])
    .subscribe(([appointments, doctor]: [Appointment[], Doctor]) => {

        const events = this.appointmentService
                           .generateEvents(doctor.doctorSchedules!, doctor.appointmentDurationDefault, appointments, true);

                           
        this.calendarOptions = {
          ...this.calendarOptions,
          events
        };
    });
  }

  update(updateAppointment: any) {
    if(this.appointment) {
      this.updatedAppointment.appointmentState = updateAppointment.appointmentState;
      if(updateAppointment.comment) {
        this.updatedAppointment.medicalHistoryComment = updateAppointment.comment;
      }
    }
 
  }

  closeModal(event: any) {
    this.display = false;
  }

  get isInvalid() {
    return this.updatedAppointment.appointmentState === AppointmentStates.Asignado; 
  }

  save() {
    this.updatedAppointment.appointmentId = this.appointment.appointmentId;

    this.appointmentService.updateAppointment(this.updatedAppointment).subscribe((data) => {
      this.display = false;
      this.loadAppointments();
    })
  }

}
