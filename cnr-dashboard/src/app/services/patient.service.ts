import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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
}
