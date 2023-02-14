import { Container, DisplayObject, Texture } from "pixi.js";
import { IItem } from "../Item/interface";
import { IAbstractBoard } from "../../abstract/Board/interface";
import { IAbstractItem } from "../../abstract/Item/interface";
import { TItemUID } from "../../types";

export type TBoardOptions = {
  abstractBoard: IAbstractBoard<IAbstractItem>;
  itemTextures: Texture[];
  maxCountOfPickedItems: number;
};

export type TDisplayObjectPosition = {
  x: number;
  y: number;
};

export type TBoardSize = { width: number; height: number };

export interface IBoard extends Container {
  items: IItem[];
  pickedItemsBoard: DisplayObject;
  maxCountOfPickedItems: number;
  getPositionOnItemList(id: number): TDisplayObjectPosition;

  fill(abstractBoard: IAbstractBoard<IAbstractItem>, itemTextures: Texture[]): IItem[];
  setItemPosition(item: IItem, size: TBoardSize): void;
  updateItemPositions(abstractBoard: IAbstractBoard<IAbstractItem>): void;
  removeItems(): void;
  removeItemByCoords(depth: number, row: number, column: number): void;
  findItemByUID(uid: TItemUID): IItem | null;
  createItemsList(length: number): void;
}
