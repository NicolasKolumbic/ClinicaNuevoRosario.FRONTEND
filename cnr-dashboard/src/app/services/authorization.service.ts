import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
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

  getUserData(): UserData | null {
    const user = localStorage.getItem("user_data");
    return user !== null ? JSON.parse(user): null;
  }

}
