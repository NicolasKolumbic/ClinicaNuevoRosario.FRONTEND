import { Injectable } from "@angular/core";
import { AppointmentModal } from "src/app/models/appointment-modal";
import { GenericSubject } from "./generic-subject";

@Injectable({
    providedIn: 'root'
  })
export class AppointmentModalSubject  {

  private _subject?: GenericSubject<AppointmentModal>;

  get subject() {
    return this._subject;
  }

  constructor() {
    this._subject = new GenericSubject<AppointmentModal>();
  }

}
