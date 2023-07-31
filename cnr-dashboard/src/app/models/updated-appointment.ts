import { AppointmentStates } from "../helpers/enums/appointment-states";

export class UpdatedAppointment {
    appointmentId!: number;
    appointmentState!: AppointmentStates;
    medicalHistoryComment!: string;
}