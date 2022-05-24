import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CalendarFilterComponent } from './components/calendar-filter/calendar-filter.component';
import { DoctorsGridComponent } from './pages/doctors-grid/doctors-grid.component';
import { PatientsGridComponent } from './pages/patients-grid/patients-grid.component';
import { AppointmentsGridComponent } from './pages/appointments-grid/appointments-grid.component';
import { MedicalSpecialtiesSearchEngineComponent } from './components/medical-specialties-search-engine/medical-specialties-search-engine.component';
import { DoctorSearchEngineComponent } from './components/doctor-search-engine/doctor-search-engine.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  bootstrap5Plugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    CalendarComponent,
    NavbarComponent,
    ToolbarComponent,
    CalendarFilterComponent,
    DoctorsGridComponent,
    PatientsGridComponent,
    AppointmentsGridComponent,
    MedicalSpecialtiesSearchEngineComponent,
    DoctorSearchEngineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    DropdownModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
