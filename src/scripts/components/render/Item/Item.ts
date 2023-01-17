import { Container, DisplayObject, Sprite } from "pixi.js";
import { TItemID, TItemPositionOnBoard } from "../../types";
import { IItem, TItemOptions } from "./interface";

export class Item extends Container implements IItem {
  item: DisplayObject;
  positionOnBoard: TItemPositionOnBoard;
  id: TItemID;
  isActive: boolean;

  constructor(options: TItemOptions) {
    const item = new Sprite(options.texture);

    super();
    this.addChild(item);
    this.item = item;
    this.id = options.id;
    this.positionOnBoard = options.positionOnBoard;
    this.isActive = true;
  }
}
