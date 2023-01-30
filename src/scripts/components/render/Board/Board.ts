import { Container, Texture } from "pixi.js";
import { Item } from "../Item";
import { IItem, TItemOptions } from "../Item/interface";
import { TBoardSize } from "../../types";
import { IBoard, TBoardOptions } from "./interface";
import { IAbstractBoard } from "../../abstract/Board/interface";

export class Board extends Container implements IBoard {
  items: IItem[];
  constructor({ abstractBoard, itemTextures, }: TBoardOptions) {
    super();
    this.interactiveChildren = false;
    this.items = [];

    this.fill(abstractBoard, itemTextures);
    this.updateItemsPosition(abstractBoard);
  }

  setItemPosition(item: IItem, { columns, rows, }: TBoardSize) {
    const { width, height, positionOnBoard, } = item;
    const isEven = positionOnBoard.depth % 2 === 0;
    const xOffset = isEven ? 0 : width * 0;
    const yOffset = isEven ? 0 : height * 0;
    const range = width * 0.3;
    const bWidth = width * columns;
    const bHeight = height * rows;
    const x = ((bWidth + range) / columns) * (-0.5 + positionOnBoard.column) + xOffset;
    const y = ((bHeight + range) / rows) * (-0.5 + positionOnBoard.row) + yOffset;

    item.x = x;
    item.y = y;
  }

  updateItemsPosition(abstractBoard: IAbstractBoard) {
    const { items, } = this;
    const { layers, } = abstractBoard;

    const boardSize: TBoardSize = {
      depth: layers.length,
      rows: layers[0].items.length,
      columns: layers[0].items[0].length,
    };

    items.forEach((item) => {
      this.setItemPosition(item, boardSize);
    });
  }

  removeItems() {
    this.removeChildren();
  }

  removeItemByCoords(depth: number, row: number, column: number) {
    const filteredItems = this.items.filter(({ positionOnBoard, }: IItem) => {
      return depth === positionOnBoard.depth && row === positionOnBoard.row && column === positionOnBoard.column;
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

  fill(abstractBoard: IAbstractBoard, textures: Texture[]): IItem[] {
    console.log(`board filling`);

    abstractBoard.layers.forEach((layer, depth) => {
      layer.items.forEach((rows, row) => {
        rows.forEach(({ id, uid, }, column) => {
          if (id === null) return;

          const itemOptions: TItemOptions = {
            uid,
            texture: textures[id],
            positionOnBoard: {
              depth,
              row,
              column,
            },
          };
          const item = this.createItem(itemOptions);

          this.items.push(item);
        });
      });
    });

    this.addChild(...this.items);

    return this.items;
  }
}
