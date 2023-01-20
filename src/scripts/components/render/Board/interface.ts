import { Container, FederatedPointerEvent, Texture } from "pixi.js";
import { IItem } from "../Item/interface";
import { ISize } from "../../types";
import { IAbstractBoard } from "../../abstract/Board/interface";

export type TItemClickHandler = (ev: FederatedPointerEvent) => void;

export type TBoardOptions = {
  abstractBoard: IAbstractBoard;
  itemTextures: Texture[];
  itemClickHandler: TItemClickHandler;
};

export interface IBoard extends Container {
  columns: number;
  boardSize: ISize;
  rows: number;
  deep: number;
  items: IItem[];
  abstractBoard: IAbstractBoard;

  fill(textures: Texture[], itemClickHandler: TItemClickHandler): IItem[];
  setItemPosition(item: IItem): void;
  updateItemsPosition(abstractBoard: IAbstractBoard): void;
}
