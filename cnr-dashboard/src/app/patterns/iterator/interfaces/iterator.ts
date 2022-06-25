export interface Iterator<T> {
  // Return the current element.
  current(): T;

  // Return the current element and move forward to next element.
  next(position?: number): T;

  isAvailableNext(): boolean;

  // Return the key of the current element.
  key(): number;

  isFirst(): boolean;

  isLast(): boolean;

  // Checks if current position is valid.
  valid(): boolean;

  // Rewind the Iterator to the first element.
  rewind(): void;
}
