import { Observer } from "./observer";

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
 export interface Subject<T> {
    // Attach an observer to the subject.
    attach(observer: Observer<T>): void;

    // Detach an observer from the subject.
    detach(observer: Observer<T>): void;

    // Notify all observers about an event.
    notify(): void;

    getState(): T
}