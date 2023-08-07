import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HealthInsurance } from '../models/health-insurance';
import { Patient } from '../models/patient';
import { EnvironmentService } from './environment.service';
import { MedicalHistory } from '../models/clinical-history';

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

  addPatient(patient: Patient) {
    return this.http.post<number>(`${this.environmentService.baseUrl}v1/Patient/AddPatient`, patient);
  }

  getMedicalHistories(doctorId: number, patientId: number) {
    return this.http.get<MedicalHistory[]>(`${this.environmentService.baseUrl}v1/MedicalHistory/GetMedicalHistoriesByPatient?doctorId=${doctorId}&patientId=${patientId}`)
    .pipe(
      map(medicalHistories => medicalHistories.map(p => new MedicalHistory(p)))
    );
  }
}
