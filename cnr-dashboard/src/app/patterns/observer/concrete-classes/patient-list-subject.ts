import { Injectable } from "@angular/core";
import { Patient } from "src/app/models/patient";
import { GenericSubject } from "./generic-subject";

@Injectable({
  providedIn: 'root'
})
export class PatientListSubject {

  private _subject?: GenericSubject<Patient[]>;

  get subject() {
    return this._subject;
  }

  constructor() {
    this._subject = new GenericSubject<Patient[]>();
  }
}
