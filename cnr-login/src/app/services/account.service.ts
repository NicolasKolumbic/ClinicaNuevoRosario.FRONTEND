import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/logged-user';
import { User } from '../models/user';
import { EnvironmentService } from './environment.service';
import {tap, shareReplay} from 'rxjs/operators'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http
      .post<LoggedUser>(`${this.environmentService.baseUrl}v1/Account/Login`, user)
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay(1)
      );
  }

  recoverPassword(email: string) {
    let body = new HttpParams();
    body = body.set('email', email);
    return this.http
      .post<string>(`${this.environmentService.baseUrl}v1/Account/RecoverPassword`, body);
  }

  private setSession(authResult: LoggedUser) {
    const expiresAt = moment().add(authResult.expireIn, 'm');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('user_data', JSON.stringify({
        name: authResult.name,
        lastName: authResult.lastName,
        roles: authResult.roles
      }));
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('user_data');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}
