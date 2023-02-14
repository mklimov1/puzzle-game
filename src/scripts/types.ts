export type TMatrix<T> = T[][];

export type TItemPosition = {
  y: number;
  x: number;
  z: number;
};

export type TPresetItem = TItemPosition & {
  id: number;
};

export type TPresetBoard = TPresetItem[];
