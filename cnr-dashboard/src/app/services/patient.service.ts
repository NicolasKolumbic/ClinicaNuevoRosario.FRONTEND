import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HealthInsurance } from '../models/health-insurance';
import { Patient } from '../models/patient';
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
    return this.http.get<Patient[]>(`${this.environmentService.baseUrl}v1/Patient/SearchPatient?text=${texto}`)
                    .pipe(
                      map(patients => patients.map(p => new Patient(p)))
                    );
  }

  getAllHealthInsurrance() {
    return this.http.get<HealthInsurance[]>(`${this.environmentService.baseUrl}v1/Patient/GetAllHealthInsurances`)
                    .pipe(
                      map(patients => patients.map(h => new HealthInsurance(h)))
                    );
  }

  addPatient(patient: Patient) {
    return this.http.post<number>(`${this.environmentService.baseUrl}v1/Patient/AddPatient`, patient);
  }
}
