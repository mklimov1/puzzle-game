import { IItemsList, TItemsListOptions } from "./interface";

export class ItemsList<T> implements IItemsList<T> {
  length: number;
  items: T[];

  constructor(options: TItemsListOptions) {
    this.length = options.length;
    this.items = [];
  }

  add(item: T) {
    const { items, } = this;

    if (items.length < this.length) {
      this.items.push(item);
      return this.items.length - 1;
    }
    return -1;
  }

  remove(item: T) {
    this.items = this.items.filter((i) => i !== item);
  }

  removeByIndex(index: number) {
    return this.items.splice(index, 1)[0];
  }

  getIndex(item: T) {
    return this.items.indexOf(item);
  }

  getItem(index: number) {
    const { items, } = this;
    if (index >= 0 && index < items.length) {
      return items[index];
    }
    return undefined;
  }

  get isFull() {
    return this.items.length >= this.length;
  }
}
