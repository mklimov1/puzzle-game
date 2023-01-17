import { TBoardPreset } from "../../types";
import { IAbstractItem, TItemStatus } from "../Item/interface";
import { AbstractLayer } from "../Layer";
import { IAbstractBoard, TAbstractBoardOptions, TAbstractLayers } from "./interface";

export class Board implements IAbstractBoard {
  layers: TAbstractLayers;

  constructor(options: TAbstractBoardOptions) {
    this.layers = [];

    if (options.boardPreset) {
      this.fill(options.boardPreset);
    }
  }

  fill(preset: TBoardPreset): TAbstractLayers {
    preset.forEach((layerPreset) => {
      const layer = new AbstractLayer({ itemPreset: layerPreset, });
      this.layers.push(layer);
    });

    this.updateItemStatuses();

    return this.layers;
  }

  updateItemStatuses(): TAbstractLayers {
    const { layers, } = this;

    layers.forEach((layer, deep) => {
      layer.items.forEach((rowItems, row) => {
        rowItems.forEach((item, column) => {
          if (!item.isEmpty) {
            const isBusy = this.isItemBusy(deep, column, row);
            const status: TItemStatus = isBusy ? `inactive` : `active`;

            item.status = status;
          }
        });
      });
    });

    return this.layers;
  }

  isItemBusy(itemDeep: number, itemColumn: number, itemRow: number) {
    const { layers, } = this;
    let deep = itemDeep + 1;

    for (deep; deep < layers.length - 1; deep++) {
      const item = layers[deep].items[itemRow][itemColumn];

      if (!item.isEmpty) {
        return true;
      }
    }
    return false;
  }
}
