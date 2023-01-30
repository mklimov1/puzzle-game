import { TBoardPreset, TItemUID } from "../../types";
import { IAbstractItem } from "../Item/interface";
import { IAbstractLayer } from "../Layer/interface";

export type TAbstractLayers = IAbstractLayer[];

export type TAbstractBoardOptions = {
  boardPreset?: TBoardPreset;
};

export interface IAbstractBoard {
  layers: TAbstractLayers;

  fill(items: TBoardPreset): TAbstractLayers;
  updateItemStatuses(): TAbstractLayers;
  isItemBusy(itemDepth: number, itemColumn: number, itemRow: number): boolean;
  updateItemStatusByCoords(depth: number, column: number, row: number): void;
  updateItemStatusesByXY(x: number, y: number): void;
  removeByPosition(depth: number, x: number, y: number): void;
  findItemByUID(uid: TItemUID): IAbstractItem | null;
}
