import { TBoardPreset } from "../../types";
import { IAbstractLayer } from "../Layer/interface";

export type TAbstractLayers = IAbstractLayer[];

export type TAbstractBoardOptions = {
  boardPreset?: TBoardPreset;
};

export interface IAbstractBoard {
  layers: TAbstractLayers;

  fill(items: TBoardPreset): TAbstractLayers;
  updateItemStatuses(): TAbstractLayers;
  isItemBusy(itemDeep: number, itemColumn: number, itemRow: number): boolean;
}
