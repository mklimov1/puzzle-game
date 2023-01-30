import { hide } from "../animations";
import { AbstractBoard } from "../components/abstract/Board";
import { Board } from "../components/render/Board";
import { IItem } from "../components/render/Item/interface";
import { IApplication, TApplicationBoard, IApplicationOptions, TApplicationTextures } from "./interface";

export class Application implements IApplication {
  board: TApplicationBoard;
  textures: TApplicationTextures;

  constructor(options: IApplicationOptions) {
    const abstractBoard = new AbstractBoard({ boardPreset: options.preset, });
    const renderBoard = new Board({ abstractBoard, itemTextures: options.textures.items, });

    this.textures = {
      items: [],
    };
    this.textures = { ...this.textures, ...options.textures, };

    this.board = {
      abstract: abstractBoard,
      render: renderBoard,
    };
  }

  init() {
    const { board, } = this;
    const abstractBoard = board.abstract;

    board.render.on(`itemClicked`, (elem) => {
      const item = elem as IItem;
      const position = item.positionOnBoard;
      const isActive = !abstractBoard.isItemBusy(position.depth, position.column, position.row);

      if (isActive) {
        item.interactive = false;

        abstractBoard.removeByPosition(position.depth, position.column, position.row);
        abstractBoard.updateItemStatusesByXY(position.column, position.row);

        // abstractPickedItems.add(item);
        // console.log(abstractPickedItems);

        hide({ targets: item, duration: 300, complete: () => {
          board.render.removeItemByCoords(position.depth, position.row, position.column);
          board.render.updateItemsPosition(this.board.abstract);
        }, });
      }
    });
  }

  start() {
    this.board.render.interactiveChildren = true;
  }
}
