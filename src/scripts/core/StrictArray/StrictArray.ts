import { TFixedLengthArray } from "./interface";

export class StrictArray<T> extends Array<(T|null)> implements TFixedLengthArray<(T|null)[]> {
  constructor(length: number) {
    super(length);
    this.fill(null);
  }

  add(item: T): number {
    const emptyIndex = this.getEmptyIndex();

    console.log(emptyIndex);

    if (emptyIndex >= 0) {
      this[emptyIndex] = item;
    }

    return emptyIndex;
  }

  removeByIndex(index: number) {
    if (index >= 0 && index < this.length) {
      this[index] = null;
    }
  }

  reset() {
    for (let i = 0; i < this.length; i++) {
      this[i] = null;
    }
  }

  removeItem(item: T) {
    const index = this.indexOf(item);

    if (index !== -1) {
      this[index] = null;
      this.removeItem(item);
    }
  }

  getEmptyIndex() {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === null) {
        return i;
      }
    }

    return -1;
  }

  isFull() {
    return this.every((item) => item !== null);
  }
}
