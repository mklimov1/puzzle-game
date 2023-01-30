export type TItemID = number | null;
export type TItemUID = number;

export type TItemPositionOnBoard = {
  row: number;
  column: number;
  depth: number;
};

export type TBoardSize = {
  rows: number;
  columns: number;
  depth: number;
};

export interface ISize {
  width: number;
  height: number;
}

export type TItemPreset = TItemID;
export type TLayerPreset = TItemPreset[][];
export type TBoardPreset = TLayerPreset[];
