import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'acceso',
    component: LoginComponent,
    children: [
      { path: '', component: LoginFormComponent },
      { path: 'recuperar-contraseña', component: RecoverPasswordComponent },
      { path: 'reestablecer-contraseña', component: ResetPasswordComponent }
    ]
  },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppRoutingModule { }
