import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { AddDoctorComponent } from './pages/add-doctor/add-doctor.component';
import { AppointmentsGridComponent } from './pages/appointments-grid/appointments-grid.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorAppointmentComponent } from './pages/doctor-appointment/doctor-appointment.component';
import { DoctorsGridComponent } from './pages/doctors-grid/doctors-grid.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PatientsGridComponent } from './pages/patients-grid/patients-grid.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { UserDataResolveService } from './services/user-data-resolve.service';
import { AnalysisDataComponent } from './pages/analysis-data/analysis-data.component';
import { AdministratorBoardComponent } from './pages/administrator-board/administrator-board.component';
import { ComunicationsComponent } from './pages/comunications/comunications.component';
import { BillingHealthInsuranceCompaniesComponent } from './pages/billing-health-insurance-companies/billing-health-insurance-companies.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      user: UserDataResolveService
    },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'medicos', component: DoctorsGridComponent },
      { path: 'agregar-medico', component: AddDoctorComponent },
      { path: 'pacientes', component: PatientsGridComponent },
      { path: 'turnos', component: AppointmentsGridComponent },
      { path: 'analisis-de-datos', component: AnalysisDataComponent},
      { path: 'switch-roles', component: AdministratorBoardComponent},
      { path: 'chat', component: ComunicationsComponent}
    ]
  },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    /*
     * Should be same as mount in root, but have strange effects when navigate between apps.
     * https://single-spa.js.org/docs/ecosystem-angular#configure-routes
     */
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppRoutingModule { }
