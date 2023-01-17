import { Container, DisplayObject, Texture } from "pixi.js";
import { TItemID, TItemPositionOnBoard } from "../../types";

export type TItemOptions = {
  texture: Texture;
  positionOnBoard: TItemPositionOnBoard;
  id: TItemID;
};

export interface IItem extends Container {
  item: DisplayObject;
  id: TItemID;
  positionOnBoard: TItemPositionOnBoard;
  isActive: boolean;
}
