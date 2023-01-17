import { Container, Texture } from "pixi.js";
import { Item } from "../Item";
import { IItem, TItemOptions } from "../Item/interface";
import { ISize, TBoardPreset } from "../../types";
import { IBoard, TBoardOptions } from "./interface";
import { IAbstractBoard } from "../../abstract/Board/interface";

export class Board extends Container implements IBoard {
  items: IItem[];
  boardSize: ISize;
  columns: number;
  rows: number;
  deep: number;

  constructor({ abstractBoard, itemTextures, }: TBoardOptions) {
    super();

    this.items = [];
    this.columns = abstractBoard.layers[0].items[0].length;
    this.rows = abstractBoard.layers[0].items.length;
    this.deep = abstractBoard.layers.length;
    this.fill(abstractBoard, itemTextures);

    const [firstItem] = this.items;

    this.boardSize = {
      width: firstItem ? firstItem.width * this.columns : 0,
      height: firstItem ? firstItem.height * this.rows : 0,
    };
    this.updateItemsPosition();
  }

  setItemPosition(item: IItem) {
    const { width, height, positionOnBoard, } = item;
    const isEven = positionOnBoard.deep % 2 === 0;
    const xOffset = isEven ? 0 : width * 0.2;
    const yOffset = isEven ? 0 : height * 0.2;
    const range = width * 0.3;
    const { boardSize, columns, rows, } = this;
    const x = ((boardSize.width + range) / columns) * (-0.5 + positionOnBoard.x) + xOffset;
    const y = ((boardSize.height + range) / rows) * (-0.5 + positionOnBoard.y) + yOffset;

    item.x = x;
    item.y = y;
  }

  updateItemsPosition() {
    const { items, } = this;

    items.forEach((item) => {
      this.setItemPosition(item);
    });
  }

  fill(abstractBoard: IAbstractBoard, textures: Texture[]): IItem[] {
    console.log(`board filling`);

    abstractBoard.layers.forEach((layer, deep) => {
      layer.items.forEach((rows, row) => {
        rows.forEach(({ id, }, col) => {
          if (id === null) return;
          const itemOptions: TItemOptions = {
            id,
            // texture: new Texture(new BaseTexture()),
            texture: textures[id],
            positionOnBoard: {
              deep,
              x: row,
              y: col,
            },
          };
          const item = new Item(itemOptions);

          this.items.push(item);
        });
      });
    });

    this.addChild(...this.items);

    return this.items;
  }
}
