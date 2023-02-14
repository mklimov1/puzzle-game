import { Container, DisplayObject, Texture } from "pixi.js";
import { TItemUID } from "../../types";
import { TItemPosition } from "@/src/scripts/types";

export type TItemOptions = {
  texture: Texture;
  boardPosition: TItemPosition;
  uid: TItemUID;
};

export interface IItem extends Container {
  item: DisplayObject;
  uid: TItemUID;
  boardPosition: TItemPosition;
}
