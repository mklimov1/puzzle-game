export type TItemID = number | null;
export type TItemUID = number;

export type TBoardSize = {
  rows: number;
  columns: number;
  depth: number;
};

export interface ISize {
  width: number;
  height: number;
}
