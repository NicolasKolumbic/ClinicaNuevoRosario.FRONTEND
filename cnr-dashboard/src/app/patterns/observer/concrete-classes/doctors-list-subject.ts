import { Injectable } from "@angular/core";
import { Doctor } from "src/app/models/doctor";
import { GenericSubject } from "./generic-subject";

@Injectable({
  providedIn: 'root'
})
export class DoctorListSubject {

  private _subject?: GenericSubject<Doctor[]>;

  get subject() {
    return this._subject;
  }

  constructor() {
    this._subject = new GenericSubject<Doctor[]>();
  }
}
