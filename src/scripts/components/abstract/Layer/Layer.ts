import { TLayerPreset } from "../../types";
import { AbstractItem } from "../Item";
import { IAbstractItem } from "../Item/interface";
import { IAbstractLayer, IAbstractLayerOptions, TAbstractItems } from "./interface";

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
        const item = new AbstractItem({
          id,
          status: `inactive`,
        });
        row.push(item);
      });
      this.items.push(row);
    });

    return this.items;
  }
}
