import {Iterator} from '../interfaces/iterator';
import { GenericCollection } from "./generic-collection";

export class GenericIterator<T> implements Iterator<T> {

  private collection!: GenericCollection<T>;

   /**
     * Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     */
    private position: number = 0;

    /**
     * This variable indicates the traversal direction.
     */
    private reverse: boolean = false;

    constructor(collection: GenericCollection<T>, reverse: boolean = false) {
      this.collection = collection;
      this.reverse = reverse;

      if (reverse) {
          this.position = collection.getCount() - 1;
      }
    }

  current(): T {
    return this.collection.getItems()[this.position];
  }

  isFirst(): boolean {
    return this.position === 0;
  }

  isLast(): boolean {
    return this.position === (this.collection.getItems().length - 1);
  }

  next(position?: number):T {
    let item;
    if(position) {
      item = this.collection.getItems()[position];
      return item;
    }

    item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  isAvailableNext(): boolean {
    return this.collection.getItems()[this.position + 1] !== undefined;
  }

  key(): number {
    return this.position;
  }

  valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }

  rewind(): void {
    this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
  }

}
