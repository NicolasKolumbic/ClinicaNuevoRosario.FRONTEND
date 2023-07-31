import { Appointment } from "./appointment";
import { HealthInsuranceReport } from "./health-insurance-report";

export class HealthInsuranceReportRequest {
   fileTitle!: string;
   reportData!: HealthInsuranceReport[];

   constructor(fileTitle: string, data: Appointment[]) {
        this.fileTitle = fileTitle;
        this.reportData = data.map((appointment: Appointment) => {
            return new HealthInsuranceReport(appointment);
        })  
   }
}