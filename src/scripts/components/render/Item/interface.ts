import { Container, DisplayObject, Texture } from "pixi.js";
import { TItemPositionOnBoard, TItemUID } from "../../types";

export type TItemOptions = {
  texture: Texture;
  positionOnBoard: TItemPositionOnBoard;
  uid: TItemUID;
};

export interface IItem extends Container {
  item: DisplayObject;
  uid: TItemUID;
  positionOnBoard: TItemPositionOnBoard;
}
