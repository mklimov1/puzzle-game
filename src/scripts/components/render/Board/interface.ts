import { Container, Texture } from "pixi.js";
import { IItem } from "../Item/interface";
import { TBoardSize } from "../../types";
import { IAbstractBoard } from "../../abstract/Board/interface";

export type TBoardOptions = {
  abstractBoard: IAbstractBoard;
  itemTextures: Texture[];
};

export interface IBoard extends Container {
  items: IItem[];

  fill(abstractBoard: IAbstractBoard, itemTextures: Texture[]): IItem[];
  setItemPosition(item: IItem, boardSize: TBoardSize): void;
  updateItemsPosition(abstractBoard: IAbstractBoard): void;
  removeItems(): void;
  removeItemByCoords(depth: number, row: number, column: number): void;
}
