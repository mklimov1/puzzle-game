export type TItemsListOptions = {
  length: number;
};

export interface IItemsList<T> {
  length: number;
  items: T[];
  isFull: boolean;

  add(item: T): number;
  remove(item: T): void;
  removeByIndex(index: number): T;
  getIndex(item: T): number;
  getItem(index: number): T | undefined;
}
