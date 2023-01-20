import { Container, Texture } from "pixi.js";
import { Item } from "../Item";
import { IItem, TItemOptions } from "../Item/interface";
import { ISize } from "../../types";
import { IBoard, TBoardOptions, TItemClickHandler } from "./interface";
import { IAbstractBoard } from "../../abstract/Board/interface";

export class Board extends Container implements IBoard {
  items: IItem[];
  boardSize: ISize;
  columns: number;
  rows: number;
  deep: number;
  abstractBoard: IAbstractBoard;

  constructor({ abstractBoard, itemTextures, itemClickHandler, }: TBoardOptions) {
    super();
    this.interactiveChildren = true;

    this.abstractBoard = abstractBoard;
    this.items = [];
    const [{ items, }] = abstractBoard.layers;
    this.columns = items[0].length;
    this.rows = items.length;
    this.deep = abstractBoard.layers.length;
    this.fill(itemTextures, itemClickHandler);

    const [firstItem] = this.items;

    this.boardSize = {
      width: firstItem ? firstItem.width * this.columns : 0,
      height: firstItem ? firstItem.height * this.rows : 0,
    };
    this.updateItemsPosition();
  }

  setItemPosition(item: IItem) {
    const { abstractBoard, } = this;
    const { width, height, positionOnBoard, } = item;
    const isEven = positionOnBoard.deep % 2 === 0;
    const xOffset = isEven ? 0 : width * 0.2;
    const yOffset = isEven ? 0 : height * 0.2;
    const range = width * 0.3;
    const { boardSize, columns, rows, } = this;
    const x = ((boardSize.width + range) / columns) * (-0.5 + positionOnBoard.x) + xOffset;
    const y = ((boardSize.height + range) / rows) * (-0.5 + positionOnBoard.y) + yOffset;
    const isActive = !abstractBoard.isItemBusy(positionOnBoard.deep, positionOnBoard.y, positionOnBoard.x);

    item.x = x;
    item.y = y;
    item.isActive = isActive;
  }

  updateItemsPosition() {
    const { items, } = this;

    items.forEach((item) => {
      this.setItemPosition(item);
    });
  }

  createItem(options: TItemOptions, clickHandler: TItemClickHandler) {
    const item = new Item(options);

    item.on(`pointertap`, clickHandler);

    return item;
  }

  fill(textures: Texture[], itemClickHandler?: TItemClickHandler): IItem[] {
    console.log(`board filling`);
    const { abstractBoard, } = this;

    abstractBoard.layers.forEach((layer, deep) => {
      layer.items.forEach((rows, row) => {
        rows.forEach(({ id, }, col) => {
          if (id === null) return;
          const itemOptions: TItemOptions = {
            id,
            texture: textures[id],
            positionOnBoard: {
              deep,
              x: row,
              y: col,
            },
          };
          const item = new Item(itemOptions);

          if (itemClickHandler) {
            item.on(`pointertap`, itemClickHandler);
          }

          this.items.push(item);
        });
      });
    });

    this.addChild(...this.items);

    return this.items;
  }
}
