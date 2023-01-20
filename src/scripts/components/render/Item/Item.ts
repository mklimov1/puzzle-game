import { Container, DisplayObject, Rectangle, Sprite } from "pixi.js";
import { TItemID, TItemPositionOnBoard } from "../../types";
import { IItem, TItemOptions } from "./interface";

export class Item extends Container implements IItem {
  private _isActive: boolean;

  item: DisplayObject;
  positionOnBoard: TItemPositionOnBoard;
  id: TItemID;

  constructor(options: TItemOptions) {
    const item = new Sprite(options.texture);
    const hitArea = new Rectangle(0, 0, item.width, item.height);

    super();
    this.addChild(item);
    this.item = item;
    this.id = options.id;
    this.positionOnBoard = options.positionOnBoard;
    this.hitArea = hitArea;

    this._isActive = false;
    this.interactive = false;
    this.isActive = false;
  }

  set isActive(value: boolean) {
    this.interactive = value;
    this._isActive = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }
}
