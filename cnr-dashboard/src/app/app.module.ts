import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import momentPlugin from '@fullcalendar/moment';

import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {TooltipModule} from 'primeng/tooltip';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';


import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DoctorsGridComponent } from './pages/doctors-grid/doctors-grid.component';
import { PatientsGridComponent } from './pages/patients-grid/patients-grid.component';
import { AppointmentsGridComponent } from './pages/appointments-grid/appointments-grid.component';
import { MedicalSpecialtiesSearchEngineComponent } from './components/medical-specialties-search-engine/medical-specialties-search-engine.component';
import { DoctorSearchEngineComponent } from './components/doctor-search-engine/doctor-search-engine.component';
import { PatientSearchEngineComponent } from './components/patient-search-engine/patient-search-engine.component';
import { AddPatientFormComponent } from './components/add-patient-form/add-patient-form.component';
import { AddAppointmentFormComponent } from './components/add-appointment-form/add-appointment-form.component';
import { ContentPanelComponent } from './components/content-panel/content-panel.component';
import { UserBarComponent } from './components/user-bar/user-bar.component';
import { SeeSchedulePanelComponent } from './components/see-schedule-panel/see-schedule-panel.component';
import { SearchPatientPanelComponent } from './components/search-patient-panel/search-patient-panel.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { AddDoctorFormComponent } from './components/add-doctor-form/add-doctor-form.component';
import { ImageFileManagmentComponent } from './components/image-file-managment/image-file-managment.component';
import { AddDoctorComponent } from './pages/add-doctor/add-doctor.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DoctorSchedulesManagerComponent } from './components/doctor-schedules-manager/doctor-schedules-manager.component';
import { HealthInsuranceSearchEngineComponent } from './components/health-insurance-search-engine/health-insurance-search-engine.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrandComponent } from './components/brand/brand.component';
import {AccordionModule} from 'primeng/accordion';
import { DoctorAppointmentComponent } from './pages/doctor-appointment/doctor-appointment.component';
import { QuickAppointmentsComponent } from './pages/quick-appointments/quick-appointments.component';
import { BillingHealthInsuranceCompaniesComponent } from './pages/billing-health-insurance-companies/billing-health-insurance-companies.component';
import { AdministratorBoardComponent } from './pages/administrator-board/administrator-board.component';
import { AnalysisDataComponent } from './pages/analysis-data/analysis-data.component';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';
import { ComunicationsComponent } from './pages/comunications/comunications.component';
import { AppointmentStatePillComponent } from './components/appointment-state-pill/appointment-state-pill.component';
import { ServiceTypePillComponent } from './components/service-type-pill/service-type-pill.component';
import { MedicalSpecialitiesListPipe } from './pipes/medical-specialities-list.pipe';
import { GenericAvatarComponent } from './components/generic-avatar/generic-avatar.component';
import { DatabaseBackupComponent } from './pages/database-backup/database-backup.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  bootstrap5Plugin,
  momentPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    CalendarComponent,
    NavbarComponent,
    ToolbarComponent,
    DoctorsGridComponent,
    PatientsGridComponent,
    AppointmentsGridComponent,
    MedicalSpecialtiesSearchEngineComponent,
    DoctorSearchEngineComponent,
    PatientSearchEngineComponent,
    AddPatientFormComponent,
    AddAppointmentFormComponent,
    ContentPanelComponent,
    UserBarComponent,
    SeeSchedulePanelComponent,
    SearchPatientPanelComponent,
    AddAppointmentComponent,
    AppointmentCardComponent,
    AddDoctorFormComponent,
    ImageFileManagmentComponent,
    AddDoctorComponent,
    StatisticsComponent,
    DoctorSchedulesManagerComponent,
    HealthInsuranceSearchEngineComponent,
    MainPageComponent,
    BrandComponent,
    DoctorAppointmentComponent,
    QuickAppointmentsComponent,
    BillingHealthInsuranceCompaniesComponent,
    AdministratorBoardComponent,
    AnalysisDataComponent,
    ViewAppointmentComponent,
    ComunicationsComponent,
    AppointmentStatePillComponent,
    ServiceTypePillComponent,
    MedicalSpecialitiesListPipe,
    GenericAvatarComponent,
    DatabaseBackupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TooltipModule,
    TableModule,
    FileUploadModule,
    AvatarModule,
    AccordionModule,
    ImageCropperModule,
    InputTextareaModule,
    CardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
