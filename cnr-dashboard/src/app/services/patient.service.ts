import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pantient } from '../models/patient';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  search(texto: string) {
    return this.http.get<Pantient[]>(`${this.environmentService.baseUrl}v1/Patient/SearchPatient?text=${texto}`);
  }
}
