import { AppointmentStates } from "../helpers/enums/appointment-states";
import { ServiceTypes } from "../helpers/enums/service-types";


export class AppointmentFilterRequest {
     startDate? : string;
     endDate?: string;
     healthInsuranceId?: number;
    medicalSpecialtyId?: number;
    doctorId?: number;
    serviceType?: ServiceTypes;
    appointmentState?: AppointmentStates ;
    month?: string;
}