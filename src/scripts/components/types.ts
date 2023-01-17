export type TItemID = number | null;
export type TItemPositionOnBoard = {
  x: number;
  y: number;
  deep: number;
};

export interface ISize {
  width: number;
  height: number;
}

export type TItemPreset = TItemID;
export type TLayerPreset = TItemPreset[][];
export type TBoardPreset = TLayerPreset[];
