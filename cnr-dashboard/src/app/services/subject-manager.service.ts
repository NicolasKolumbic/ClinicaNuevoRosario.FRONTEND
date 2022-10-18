import { Injectable } from '@angular/core';
import { GenericSubject } from '../patterns/observer/concrete-classes/generic-subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectManagerService {

  private subjectCollection: GenericSubject<any>[] = [];

  constructor() { }

  add(subject: GenericSubject<any>) {
    this.subjectCollection.push(subject);
  }

  getSubjectByName<T>(name: string): GenericSubject<T>  {
    const subject =  this.subjectCollection.find((subject: GenericSubject<T>) => subject.name === name);
    return subject as GenericSubject<T>;
  }
}
