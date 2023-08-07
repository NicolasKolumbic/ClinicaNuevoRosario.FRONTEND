import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { UserChat } from '../models/user-chat';
import { map } from 'rxjs/operators';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  updateUserRole(email: string, role: string) {
    return this.http.post(`${this.environmentService.baseUrl}v1/Account/AssignRole`, {
      email: email,
      role: role
    })
  }

  users(userChat: UserChat) {
    return this.http.get(`${this.environmentService.baseUrl}v1/User/GetUsersChat`)
    .pipe(
      map((users: any) => {
        return users
                  .map((user: any) => new UserChat(user))
                  .filter((user: UserChat) => user.email !== userChat.email)
      })
    )
  }

  addUser(user: NewUser) {
    return this.http.post(`${this.environmentService.baseUrl}v1/Account/Register`, user)
  }
}
