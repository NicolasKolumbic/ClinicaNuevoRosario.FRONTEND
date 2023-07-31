import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Plan } from '../models/plan';
import { EnvironmentService } from './environment.service';
import { HealthInsurance } from '../models/health-insurance';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  getAllHealthInsurrancePlans() {
    return this.http.get<Plan[]>(`${this.environmentService.baseUrl}v1/HealthInsurance/GetAllPlans`)
                    .pipe(
                      map(plans => plans.map(p => new Plan(p)))
                    );
  }

  getAllHealthInsurrances() {
    return this.http.get<HealthInsurance[]>(`${this.environmentService.baseUrl}v1/HealthInsurance/GetAllHealthInsurances`)
                    .pipe(
                      map(patients => patients.map(h => new HealthInsurance(h)))
                    );
  }

}
