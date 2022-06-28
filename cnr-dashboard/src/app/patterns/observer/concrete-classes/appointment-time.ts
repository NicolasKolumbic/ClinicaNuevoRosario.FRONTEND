import { Injectable } from "@angular/core";
import { Moment } from "moment";
import { GenericSubject } from "./generic-subject";

@Injectable({
  providedIn: 'root'
})
export class AppointmentTimeSubject {
  private _subject?: GenericSubject<Moment>;

  get subject() {
    return this._subject;
  }

  constructor() {
    this._subject = new GenericSubject<Moment>();
  }
}
