import { TItemUID } from "../../types";
import { TItemPosition, TPresetBoard } from "@/src/scripts/types";

export type TAbstractBoardOptions = {
  boardPreset?: TPresetBoard;
};

export type TAbstractBoardItem = {
  uid: TItemUID;
  position: TItemPosition;
};

export interface IAbstractBoard<T extends TAbstractBoardItem> {
  items: T[];

  fill(preset: TPresetBoard): T[];
  isItemBusy(item: T): boolean;
  removeByPosition(x: number, y: number, z: number): void;
  findItemByUID(uid: TItemUID): T | null;
  sortByPosition(): T[];
}
