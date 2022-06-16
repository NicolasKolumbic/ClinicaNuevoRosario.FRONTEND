import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { Doctor } from '../models/doctor';
import { MedicalSpeciality } from '../models/medical-speciality';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  search(texto: string) {

    return this.http.get<Doctor[]>(`${this.environmentService.baseUrl}v1/Doctor/SearchDoctor?text=${texto}`)
    .pipe(
      debounceTime(5000),
      distinctUntilChanged()
    );
  }

  getAllMedicalSpecialities() {

    return this.http.get<MedicalSpeciality[]>(`${this.environmentService.baseUrl}v1/Doctor/AllMedicalSpecial`)
    .pipe(
      map((medicalSpecialities: any[]) => medicalSpecialities.map(me => new MedicalSpeciality(me)))
    );
  }
}


