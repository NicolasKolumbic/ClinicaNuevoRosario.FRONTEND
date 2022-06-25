import {Iterator} from '../interfaces/iterator';
import { Aggregator } from "../interfaces/aggregator";
import { GenericIterator } from "./generic-iterator";

export class GenericCollection<T> implements Aggregator<T> {

  private items: T[] = [];

    public getItems(): T[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: T): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<T> {
        return new GenericIterator<T>(this);
    }

    public getReverseIterator(): Iterator<T> {
        return new GenericIterator<T>(this, true);
    }
  }
