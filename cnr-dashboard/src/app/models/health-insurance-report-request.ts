import { Appointment } from "./appointment";
import { HealthInsuranceReport } from "./health-insurance-report";

export class HealthInsuranceReportRequest {
   fileTitle!: string;
   healthInsuranceName!: string;
   reportData!: HealthInsuranceReport[];

   constructor(fileTitle: string, healthInsuranceName: string, data: Appointment[]) {
        this.fileTitle = fileTitle;
        this.healthInsuranceName = healthInsuranceName;
        this.reportData = data.map((appointment: Appointment) => {
            return new HealthInsuranceReport(appointment);
        })  
   }
}