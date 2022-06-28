import { Observer } from "../interfaces/observer";
import { Subject } from "../interfaces/subject";

export class GenericObserver<T> implements Observer<T> {

  private fn!: (updatedData: T) => void;

  constructor(fn: (updatedData: T) => void) {
    this.fn = fn;
  }

  update(subject: Subject<T>): void {
    const updatedData = subject.getState();
    this.fn(updatedData);
  }

}
