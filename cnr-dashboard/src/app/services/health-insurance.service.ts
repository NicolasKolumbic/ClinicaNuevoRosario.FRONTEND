import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Plan } from '../models/plan';
import { EnvironmentService } from './environment.service';

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

}
