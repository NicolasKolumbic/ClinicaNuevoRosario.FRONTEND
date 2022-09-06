import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators'
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
      map((doctors: Doctor[]) => doctors.map(d => new Doctor(d))),
      debounceTime(5000),
      distinctUntilChanged(),    
    );
  }

  allMedicalSpeacilities() {
    return this.http.get<MedicalSpeciality[]>(`${this.environmentService.baseUrl}v1/Doctor/AllMedicalSpecial`)
    .pipe(
      map((medicalSpecialities: any[]) => medicalSpecialities.map(me => new MedicalSpeciality(me)))
    );
  }

  getDoctorsByMedicalSpeciality(medicalSpeciality: number) {
    return this.http.get<Doctor[]>(`${this.environmentService.baseUrl}v1/Doctor/GetDoctorsByMedicalSpeciality?medicalSpecialityId=${medicalSpeciality}`)
    .pipe(
      map((doctors: any[]) => doctors.map(d => new Doctor(d)))
    );
  }

  getAllDoctor() {
    return this.http.get<Doctor[]>(`${this.environmentService.baseUrl}v1/Doctor/GetAllDoctors`)
    .pipe(
      map((doctors: any[]) => doctors.map(d => new Doctor(d)))
    );
  }

  addDoctor(doctor: Doctor) {
    return this.http.post(`${this.environmentService.baseUrl}v1/Doctor/AddDoctor`, doctor);
  }
}


