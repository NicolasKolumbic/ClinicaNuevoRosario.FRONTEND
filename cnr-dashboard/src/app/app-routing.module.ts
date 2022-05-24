import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { AppointmentsGridComponent } from './pages/appointments-grid/appointments-grid.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsGridComponent } from './pages/doctors-grid/doctors-grid.component';
import { PatientsGridComponent } from './pages/patients-grid/patients-grid.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'medicos', component: DoctorsGridComponent },
  { path: 'pacientes', component: PatientsGridComponent },
  { path: 'turnos', component: AppointmentsGridComponent },
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
