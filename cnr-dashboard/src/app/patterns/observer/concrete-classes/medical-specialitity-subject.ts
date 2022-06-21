import { Injectable } from "@angular/core";
import { Doctor } from "src/app/models/doctor";
import { MedicalSpeciality } from "src/app/models/medical-speciality";
import { Observer } from "../interfaces/observer";
import { Subject } from "../interfaces/subject";

@Injectable({
    providedIn: 'root'
  })
export class MedicalSpecialitySubject implements Subject<Doctor[]> {
    
    getState(): Doctor[] {
        return this.doctors;
    }

    private doctors: Doctor[] = [];

    /**
     * @type {Observer[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
     private observers: Observer<Doctor[]>[] = [];

    attach(observer: Observer<Doctor[]>): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }
    detach(observer: Observer<Doctor[]>): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }
    notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    updateDoctors(doctors: Doctor[]) {
        this.doctors = doctors;
        this.notify();
    }

}