import { getUID } from "../../../core/utils";
import { TItemID, TItemUID, TLayerPreset } from "../../types";
import { AbstractItem } from "../Item";
import { IAbstractItem, TItemStatus } from "../Item/interface";
import { IAbstractLayer, IAbstractLayerOptions, TAbstractItems } from "./interface";

const createItem = (id: TItemID, status?: TItemStatus) => new AbstractItem({
  id,
  status,
  uid: getUID(),
});

export class Layer implements IAbstractLayer {
  items: TAbstractItems;

  constructor(options: IAbstractLayerOptions) {
    this.items = [];

    if (options.itemPreset) {
      this.fill(options.itemPreset);
    }
  }

  fill(preset: TLayerPreset): TAbstractItems {
    preset.forEach((rowItems) => {
      const row: IAbstractItem[] = [];

      rowItems.forEach((id) => {
        const item = createItem(id, `inactive`);
        row.push(item);
      });
      this.items.push(row);
    });

    return this.items;
  }

  findItemByUID(uid: TItemUID): IAbstractItem | null {
    const { items, } = this;

    for (let row = 0; row < items.length; row++) {
      const rowItems = items[row];

      for (let column = 0; column < rowItems.length; column++) {
        const item = rowItems[column];

        if (item.uid === uid) {
          return item;
        }
      }
    }
    return null;
  }
}
