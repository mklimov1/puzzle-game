import { TBoardPreset, TItemUID } from "../../types";
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

    layers.forEach((layer, depth) => {
      layer.items.forEach((rowItems, row) => {
        rowItems.forEach((item, column) => {
          this.updateItemStatusByCoords(depth, column, row);
        });
      });
    });
    return this.layers;
  }

  updateItemStatusByCoords(depth: number, column: number, row: number) {
    const item = this.layers[depth].items[row][column];

    if (!item.isEmpty) {
      const isBusy = this.isItemBusy(depth, column, row);
      const status: TItemStatus = isBusy ? `inactive` : `active`;

      item.status = status;
    }
  }

  updateItemStatusesByXY(x: number, y: number) {
    const { layers, } = this;

    layers.forEach((layer, depth) => {
      this.updateItemStatusByCoords(depth, x, y);
    });
  }

  isItemBusy(itemDepth: number, itemColumn: number, itemRow: number) {
    const { layers, } = this;
    let depth = itemDepth + 1;

    for (depth; depth < layers.length; depth++) {
      const item = layers[depth].items[itemRow][itemColumn];
      if (!item.isEmpty) return true;
    }
    return false;
  }

  removeByPosition(depth: number, x: number, y: number) {
    this.layers[depth].items[y][x].id = null;
  }

  findItemByUID(uid: TItemUID): IAbstractItem | null {
    const { layers, } = this;

    for (let i = 0; i < layers.length; i++) {
      const item = layers[i].findItemByUID(uid);

      if (item !== null) {
        return item;
      }
    }
    return null;
  }
}
