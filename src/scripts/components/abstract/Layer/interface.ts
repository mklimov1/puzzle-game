import { TLayerPreset } from "../../types";
import { IAbstractItem } from "../Item/interface";

export type TAbstractItems = IAbstractItem[][];

export interface IAbstractLayerOptions {
  itemPreset: TLayerPreset;
}

export interface IAbstractLayer {
  items: TAbstractItems;

  fill(preset: TLayerPreset): TAbstractItems;
}
