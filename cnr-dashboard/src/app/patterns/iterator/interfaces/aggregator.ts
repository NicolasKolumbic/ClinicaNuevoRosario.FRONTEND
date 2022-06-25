import {Iterator} from '../interfaces/iterator';

export interface Aggregator<T> {
  // Retrieve an external iterator.
  getIterator(): Iterator<T>;
}
