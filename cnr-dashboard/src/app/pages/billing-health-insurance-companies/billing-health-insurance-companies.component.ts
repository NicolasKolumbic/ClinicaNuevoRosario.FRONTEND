import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { HealthInsuranceReportRequest } from 'src/app/models/health-insurance-report-request';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'cnr-billing-health-insurance-companies',
  templateUrl: './billing-health-insurance-companies.component.html',
  styleUrls: ['./billing-health-insurance-companies.component.scss']
})
export class BillingHealthInsuranceCompaniesComponent implements OnInit {

  public appointments : Appointment[] = [];
  loading: boolean = false;

  @ViewChild('appointmentsTable', {static: false}) table: any;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[]) => this.appointments = appointments);
   
  }

  generateReport() {
    const title = `Reporte de Facturación Prepagas/Obras Sociales - ${moment().format('dd-MM-yyyy HH:mm')}`
    const request = new HealthInsuranceReportRequest(title, this.appointments);
    
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
