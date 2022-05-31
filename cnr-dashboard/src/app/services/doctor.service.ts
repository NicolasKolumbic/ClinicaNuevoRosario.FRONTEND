import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Doctor } from '../models/doctor';

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
}


