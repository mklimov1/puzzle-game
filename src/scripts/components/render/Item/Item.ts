import { Container, DisplayObject, Rectangle, Sprite } from "pixi.js";
import { TItemPositionOnBoard, TItemUID } from "../../types";
import { IItem, TItemOptions } from "./interface";

export class Item extends Container implements IItem {
  uid: TItemUID;
  item: DisplayObject;
  positionOnBoard: TItemPositionOnBoard;

  constructor(options: TItemOptions) {
    const item = new Sprite(options.texture);
    const hitArea = new Rectangle(0, 0, item.width, item.height);

    super();
    this.addChild(item);
    this.item = item;
    this.uid = options.uid;
    this.positionOnBoard = options.positionOnBoard;
    this.hitArea = hitArea;
    this.interactive = true;
  }
}
