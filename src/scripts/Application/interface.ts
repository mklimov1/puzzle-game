import { DisplayObject, Texture } from "pixi.js";
import { IAbstractBoard } from "../components/abstract/Board/interface";
import { IAbstractItem } from "../components/abstract/Item/interface";
import { IItemsList } from "../components/abstract/ItemsList/interface";
import { IBoard } from "../components/render/Board/interface";
import { TPresetBoard } from "../types";

export type TApplicationTextures = {
  items: Texture[];
};

export interface IApplicationOptions {
  preset: TPresetBoard;
  textures: TApplicationTextures;
  maxPickedItems: number;
}

export interface IGameElement<A, R> {
  abstract: A;
  render: R;
}

type TSize = {
  width: number;
  height: number;
};

export type TApplicationBoard = IGameElement<IAbstractBoard<IAbstractItem>, IBoard> & {size: TSize};
export type TApplicationItemsList = IItemsList<IAbstractItem>;

export interface IApplication {
  maxPickedItems: number;
  board: TApplicationBoard;
  itemsList: TApplicationItemsList;
  enable: boolean;

  textures: TApplicationTextures;
  init: () => void;
}
