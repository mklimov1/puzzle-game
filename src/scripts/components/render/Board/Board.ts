import { Container, DisplayObject, Graphics, ISize, Texture } from "pixi.js";
import { Item } from "../Item";
import { IItem, TItemOptions } from "../Item/interface";
import { IBoard, TBoardOptions, TBoardSize } from "./interface";
import { IAbstractBoard } from "../../abstract/Board/interface";
import { IAbstractItem } from "../../abstract/Item/interface";
import { getBoardSizeByPosition } from "../../../core/utils";
import { TItemUID } from "../../types";

export class Board extends Container implements IBoard {
  items: IItem[];
  pickedItemsBoard: DisplayObject;
  maxCountOfPickedItems: number;

  constructor({ abstractBoard, itemTextures, maxCountOfPickedItems, }: TBoardOptions) {
    super();
    this.interactiveChildren = false;
    this.items = [];
    this.maxCountOfPickedItems = maxCountOfPickedItems;

    this.fill(abstractBoard, itemTextures);
    this.updateItemPositions();
    this.pickedItemsBoard = this.createItemsList(maxCountOfPickedItems);
  }

  setItemPosition(item: IItem, size: TBoardSize) {
    const { width, height, boardPosition, } = item;
    const x = width * (boardPosition.x - size.width * 0.5);
    const y = height * (boardPosition.y - size.height * 0.5);

    item.x = x;
    item.y = y;
  }

  updateItemPositions() {
    const { items, } = this;
    const positions = this.items.map((item) => item.boardPosition);
    const boardSize = getBoardSizeByPosition(positions);

    items.forEach((item) => {
      this.setItemPosition(item, boardSize);
    });
  }

  removeItems() {
    this.removeChildren();
  }

  removeItemByCoords(depth: number, row: number, column: number) {
    const filteredItems = this.items.filter(({ boardPosition, }: IItem) => {
      return depth === boardPosition.z && row === boardPosition.y && column === boardPosition.x;
    });

    if (filteredItems.length > 0) {
      this.removeChild(...filteredItems);
    }
  }

  createItem(options: TItemOptions) {
    const item = new Item(options);

    item.on(`pointertap`, () => {
      this.emit(`itemClicked`, item);
    }, item);

    return item;
  }

  fill(abstractBoard: IAbstractBoard<IAbstractItem>, textures: Texture[]): IItem[] {
    console.log(`board filling`);
    const sortedItems = abstractBoard.sortByPosition();

    sortedItems.forEach(({ uid, id, position, }) => {
      if (id === null) return;

      const options: TItemOptions = {
        uid,
        texture: textures[id],
        boardPosition: position,
      };
      const item = this.createItem(options);

      // item.zIndex = position.z;

      this.items.push(item);
    });

    this.addChild(...this.items);

    // this.sortChildren();

    return this.items;
  }

  findItemByUID(uid: TItemUID): IItem | null {
    const { items, } = this;

    for (let i = 0; i < items.length; i++) {
      if (items[i].uid === uid) return items[i];
    }

    return null;
  }

  createItemsList(length: number) {
    const [item] = this.items;
    const itemSize = {
      width: item.width,
      height: item.height,
    };
    const bg = new Graphics();
    const width = itemSize.width * length * 1.1;
    const height = itemSize.height * 1.1;

    bg.beginFill(0xffffff, 0.6);
    bg.drawRect(0, 0, width, height);
    bg.endFill();

    this.addChildAt(bg, 0);

    bg.pivot.set(width * 0.5, height * 0.5);
    bg.x = 0;
    bg.y = bg.height * 2;

    return bg;
  }

  getPositionOnItemList(id: number) {
    const length = this.maxCountOfPickedItems;
    const [item] = this.items;
    const itemSize = {
      width: item.width,
      height: item.height,
    };
    const bg = this.pickedItemsBoard;

    return {
      x: bg.x + itemSize.width * (id - length * 0.5),
      y: bg.y - itemSize.height * 0.5,
    };
  }
}
