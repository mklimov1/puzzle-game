import { Container, Texture } from "pixi.js";
import { IItem } from "../Item/interface";
import { ISize } from "../../types";
import { IAbstractBoard } from "../../abstract/Board/interface";

export type TBoardOptions = {
  abstractBoard: IAbstractBoard;
  itemTextures: Texture[];
};

export interface IBoard extends Container {
  columns: number;
  boardSize: ISize;
  rows: number;
  deep: number;
  items: IItem[];

  fill(abstractBoard: IAbstractBoard, textures: Texture[]): IItem[];
  setItemPosition(item: IItem): void;
  updateItemsPosition(): void;
}
