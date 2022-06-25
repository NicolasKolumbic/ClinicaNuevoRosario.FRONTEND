import { WeekDays } from "../helpers/enums/week-days";

export class DoctorSchedule {
  public appointmentDuration?: number;
  public day!: WeekDays
  public doctorScheduleId!: number;
  public endTime!: number;
  public startTime!: number;

  constructor(doctorSchedule: DoctorSchedule) {
    this.appointmentDuration = doctorSchedule.appointmentDuration;
    this.day = doctorSchedule.day;
    this.doctorScheduleId = doctorSchedule.doctorScheduleId;
    this.endTime = doctorSchedule.endTime;
    this.startTime = doctorSchedule.startTime;
  }
}
