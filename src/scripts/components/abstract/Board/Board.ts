import { TItemUID } from "../../types";
import { IAbstractItem } from "../Item/interface";
import { IAbstractBoard, TAbstractBoardOptions } from "./interface";
import { TPresetBoard } from "@/src/scripts/types";
import { createAbstractItem, sortByPosition } from "../../../core/utils";

export class Board implements IAbstractBoard<IAbstractItem> {
  items: IAbstractItem[];

  constructor(options: TAbstractBoardOptions) {
    this.items = [];

    if (options.boardPreset) {
      this.fill(options.boardPreset);
    }
  }

  fill(preset: TPresetBoard): IAbstractItem[] {
    preset.forEach(({ id, ...position }) => {
      this.items.push(createAbstractItem(id, position));
    });
    return this.items;
  }

  isItemBusy(item: IAbstractItem) {
    const { items, } = this;
    const { position: { x, y, z, }, } = item;
    const xRange = [x - 1, x + 1];
    const yRange = [y - 1, y + 1];
    const filteredItems = this.sortByPosition();
    const index = filteredItems.indexOf(item);

    for (let i = index + 1; i < filteredItems.length; i++) {
      const { position, } = filteredItems[i];

      if (
        item !== items[i]
        // && (position.z >= z && index < i)
        && position.z >= z
        && (xRange[0] < position.x && xRange[1] > position.x)
        && (yRange[0] < position.y && yRange[1] > position.y)
      ) {
        return true;
      }
    }
    return false;
  }

  removeByPosition(x: number, y: number, z: number) {
    this.items = this.items.filter(({ position, }) => {
      return !(x === position.x && y === position.y && z === position.z);
    });
  }

  findItemByUID(uid: TItemUID): IAbstractItem | null {
    const { items, } = this;

    for (let i = 0; i < items.length; i++) {
      if (items[i].uid === uid) return items[i];
    }

    return null;
  }

  sortByPosition(): IAbstractItem[] {
    return sortByPosition(this.items);
  }
}
