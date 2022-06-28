import { Injectable } from "@angular/core";
import { MedicalSpeciality } from "src/app/models/medical-speciality";
import { GenericSubject } from "./generic-subject";


@Injectable({
    providedIn: 'root'
  })
export class MedicalSpecialitySubject  {
  private _subject!: GenericSubject<MedicalSpeciality>;

  get subject() {
    return this._subject;
  }

  constructor() {
    this._subject = new GenericSubject<MedicalSpeciality>();
  }


}
