import { hide } from "../animations";
import { AbstractBoard } from "../components/abstract/Board";
import { IAbstractItem } from "../components/abstract/Item/interface";
import { ItemsList } from "../components/abstract/ItemsList/ItemsList";
import { Board } from "../components/render/Board";
import { IItem } from "../components/render/Item/interface";
import { getBoardSizeByPosition, mapValuesByProperty } from "../core/utils";
import { IApplication, TApplicationBoard, IApplicationOptions, TApplicationTextures, TApplicationItemsList } from "./interface";

const MAX_MATCHES = 3;

export class Application implements IApplication {
  _enabled: boolean;
  maxPickedItems: number;
  board: TApplicationBoard;
  itemsList: TApplicationItemsList;
  textures: TApplicationTextures;

  constructor(options: IApplicationOptions) {
    const abstractBoard = new AbstractBoard({ boardPreset: options.preset, });
    const renderBoard = new Board({
      abstractBoard,
      itemTextures: options.textures.items,
      maxCountOfPickedItems: 7,
    });
    const boardSize = getBoardSizeByPosition(options.preset);
    const abstractItemsList = new ItemsList<IAbstractItem>({
      length: options.maxPickedItems,
    });

    this.maxPickedItems = options.maxPickedItems;
    this.textures = {
      items: [],
    };
    this.textures = { ...options.textures, ...this.textures, };

    this.board = {
      abstract: abstractBoard,
      render: renderBoard,
      size: boardSize,
    };
    this.itemsList = abstractItemsList;

    this._enabled = false;
    this.enable = false;
  }

  set enable(value: boolean) {
    const { render, } = this.board;

    this._enabled = value;
    render.interactiveChildren = value;
    render.interactive = value;
  }

  get enable(): boolean {
    return this._enabled;
  }

  init() {
    const { board, itemsList, } = this;
    const { abstract: abstractBoard, render: renderBoard, } = board;

    renderBoard.off(`itemClicked`);
    renderBoard.on(`itemClicked`, (elem) => {
      const item = elem as IItem;
      const aItem = abstractBoard.findItemByUID(item.uid) as IAbstractItem;
      const isActive = !abstractBoard.isItemBusy(aItem);

      console.log(item.boardPosition);

      if (isActive) {
        const position = item.boardPosition;

        item.interactive = false;
        abstractBoard.removeByPosition(position.x, position.y, position.z);
        itemsList.add(aItem);

        const index = itemsList.getIndex(aItem);
        const pos = renderBoard.getPositionOnItemList(index);

        item.x = pos.x;
        item.y = pos.y;

        const filteredItems = mapValuesByProperty(`id`, itemsList.items);

        Object.values(filteredItems).forEach((items) => {
          if (items.length >= MAX_MATCHES) {
            for (let index = 0; index < MAX_MATCHES; index++) {
              const item = items[index];
              itemsList.remove(item);
            }
            const uids = items.map(({ uid, }) => uid);
            const renderItems = renderBoard.items.filter(({ uid, }) => uids.includes(uid));

            hide({ targets: renderItems, duration: 300, complete: () => {
              itemsList.items.forEach((aItem) => {
                const renderItem = renderBoard.findItemByUID(aItem.uid);

                if (renderItem) {
                  const index = itemsList.getIndex(aItem);
                  const pos = renderBoard.getPositionOnItemList(index);

                  renderItem.x = pos.x;
                  renderItem.y = pos.y;
                }
              });
            }, });
          }
        });

        if (itemsList.isFull) {
          this.enable = false;
          console.log(`lose`);
        }
      }
    });
  }
}
