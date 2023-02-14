import { Container, DisplayObject, Rectangle, Sprite } from "pixi.js";
import { TItemPosition } from "@/src/scripts/types";
import { TItemUID } from "../../types";
import { IItem, TItemOptions } from "./interface";

export class Item extends Container implements IItem {
  uid: TItemUID;
  item: DisplayObject;
  boardPosition: TItemPosition;

  constructor(options: TItemOptions) {
    const item = new Sprite(options.texture);
    const hitArea = new Rectangle(0, 0, item.width, item.height);

    super();
    this.addChild(item);
    this.item = item;
    this.uid = options.uid;
    this.boardPosition = options.boardPosition;
    this.hitArea = hitArea;
    this.interactive = true;
  }
}
