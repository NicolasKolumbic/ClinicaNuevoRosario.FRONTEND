import { Subject } from "./subject";

/**
 * The Observer interface declares the update method, used by subjects.
 */
 export interface Observer<T> {
    // Receive update from subject.
    update(subject: Subject<T>): void;
}