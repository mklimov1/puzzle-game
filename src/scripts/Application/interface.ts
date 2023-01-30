import { Texture } from "pixi.js";
import { IAbstractBoard } from "../components/abstract/Board/interface";
import { IBoard } from "../components/render/Board/interface";
import { TBoardPreset } from "../components/types";

export type TApplicationTextures = {
  items: Texture[];
};

export interface IApplicationOptions {
  preset: TBoardPreset;
  textures: TApplicationTextures;
}

export interface IGameElement<A, R> {
  abstract: A;
  render: R;
}

export type TApplicationBoard = IGameElement<IAbstractBoard, IBoard>;

export interface IApplication {
  board: TApplicationBoard;
  textures: TApplicationTextures;
  init: () => void;
  start: () => void;
}
