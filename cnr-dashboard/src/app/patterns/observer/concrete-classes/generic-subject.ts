import { Observer } from "../interfaces/observer";
import { Subject } from "../interfaces/subject";

export class GenericSubject<T> implements Subject<T> {

constructor(name: string) {
  this.name = name
}

  getState(): T {
    return this.state;
  }

  public name: string;
  private state!: T;
  private observers: Observer<T>[] = [];

  attach(observer: Observer<T>): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  detach(observer: Observer<T>): void {
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

  update(state: T) {
    this.state = state;
    this.notify();
  }
}
