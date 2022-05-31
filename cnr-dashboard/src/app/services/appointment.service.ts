import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  getAll(texto: string) {

    return this.http.get<any[]>(`${this.environmentService.baseUrl}v1/Appointment/AllAppointments`);
  }
}
