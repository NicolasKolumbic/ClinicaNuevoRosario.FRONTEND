import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentFilterRequest } from 'src/app/models/appointment-filter-request';
import { HealthInsurance } from 'src/app/models/health-insurance';
import { HealthInsuranceReportRequest } from 'src/app/models/health-insurance-report-request';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HealthInsuranceService } from 'src/app/services/health-insurance.service';

@Component({
  selector: 'cnr-billing-health-insurance-companies',
  templateUrl: './billing-health-insurance-companies.component.html',
  styleUrls: ['./billing-health-insurance-companies.component.scss']
})
export class BillingHealthInsuranceCompaniesComponent implements OnInit {

  public appointments : Appointment[] = [];
  public healthInsuranceOptions: HealthInsurance[]= [];
  public selectedHealthInsurance?: HealthInsurance;
  public time?: string;
  loading: boolean = false;

  @ViewChild('appointmentsTable', {static: false}) table: any;

  constructor(
    private appointmentService: AppointmentService,
    private healthInsuranceService: HealthInsuranceService
  ) { }

  ngOnInit(): void {
    const month = moment().toISOString();
    this.time = moment().format('MMMM-YYYY');
    const request = new AppointmentFilterRequest();
    request.month = month;
    this.appointmentService.filter(request).subscribe((appointments:Appointment[]) => {
      this.appointments = [...appointments]
    })

    this.healthInsuranceService.getAllHealthInsurrances().subscribe(healthInsurances => {
      this.healthInsuranceOptions = healthInsurances;
    })
  }

  generateReport() {
    if( this.selectedHealthInsurance) {
      const title = `Reporte de Facturación Prepagas/Obras Sociales - ${moment().format('dd-MM-yyyy HH:mm')}`
      const request = new HealthInsuranceReportRequest(title, this.selectedHealthInsurance!.name, this.appointments);
      
      this.appointmentService.generateReport(request).subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(response);
        const showWindow = window.open(url);
        if (!showWindow || showWindow.closed || typeof showWindow.closed === 'undefined') {
          alert('Please disable your Pop-up blocker and try again');
        }
      });
    }
   
  }

  selectHealthInsurance(healthInsurance: HealthInsurance) {
    if(healthInsurance) {
      const month = moment(this.time).toISOString();
      const request = new AppointmentFilterRequest();
      request.month = month;
      request.healthInsuranceId = healthInsurance.id;
      this.appointmentService.filter(request).subscribe((appointments:Appointment[]) => {
        this.appointments = [...appointments]
      })
    }

  }

  change(date: string) {
    const month = moment(date).toISOString();
    const request = new AppointmentFilterRequest();
    request.month = month;
    this.appointmentService.filter(request).subscribe((appointments:Appointment[]) => {
      this.appointments = [...appointments]
    })
  }

  clear() {
    this.time = '';
    this.selectedHealthInsurance = undefined
  }

}
