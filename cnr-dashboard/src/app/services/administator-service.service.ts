import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministatorServiceService {
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) { }

  public generateBackupDatabase(fileName: string) {
    return this.http.post(`${this.environmentService.baseUrl}v1/Administrator/GenerateBackupDatabase`, { fileName }, { responseType: 'blob'});
  }

}
