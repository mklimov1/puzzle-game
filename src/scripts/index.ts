import { Application, Graphics, Renderer } from "pixi.js";
import "../styles/styles.sass";
import { images } from "../assets/images";
import { ItemsList } from "./components/abstract/ItemsList/ItemsList";
import { Application as Game } from "./Application";
import { loadImage } from "./components/render/utils";
import { TPresetItem, TPresetBoard } from "./types";

const getColorTexture = (renderer: Renderer, width: number, height: number, color: number, alpha = 1) => {
  const rect = new Graphics().beginFill(color, alpha).drawRect(0, 0, width, height).endFill();
  const texture = renderer.generateTexture(rect);

  return texture;
};

const dpr = devicePixelRatio || 1;
const application = new Application({
  resolution: dpr,
});
const renderer = application.renderer as Renderer;
const textureSize: [number, number] = [100, 100];
// const itemTextures = [
//   getColorTexture(renderer, ...textureSize, 0xff0000, 1),
//   getColorTexture(renderer, ...textureSize, 0x00ff00, 1),
//   getColorTexture(renderer, ...textureSize, 0x0000ff, 1)
// ];

const textureSources = {
  items: images.cards,
};
const itemTextures = Object.values(await loadImage(textureSources.items));

// const boardPreset = [[[0, null, 0], [0, null, 0], [0, 0, null]], [[null, null, 1], [1, 1, null], [null, 1, 1]], [[null, 2, 2], [2, 2, null], [2, null, 2]]];
const createPresetItem = (x: number, y: number, z: number, id: number): TPresetItem => ({ x, y, z, id, });
const boardPreset: TPresetBoard = [
  createPresetItem(0, 0, 0, 0),
  createPresetItem(1, 1, 0, 1),
  createPresetItem(2, 2, 0, 2),

  createPresetItem(1, 2, 1, 2),
  createPresetItem(2, 1, 1, 1),
  createPresetItem(0, 0, 2, 0),

  createPresetItem(0, 2, 2, 2),
  createPresetItem(1, 2, 2, 1),
  createPresetItem(2, 2, 3, 0),

  createPresetItem(0.5, 0, 1, 2),
  createPresetItem(-0.5, 1, 1, 3),
  createPresetItem(0.5, 2, 1, 3),
  createPresetItem(1, 0, 1, 3),
  createPresetItem(2, 0, 1, 3)
];

const appWrapper = document.querySelector(`#app`) as HTMLElement;
const appSize: [number, number] = [appWrapper.clientWidth / dpr, appWrapper.clientHeight / dpr];

const game = new Game({
  maxPickedItems: 7,
  preset: boardPreset,
  textures: {
    items: itemTextures,
  },
});
const board = game.board.render;

application.stage.scale.set(1 / dpr);

game.init();
game.enable = true;

appWrapper.appendChild(application.view as HTMLCanvasElement);

application.renderer.resize(...appSize);

board.x = appSize[0] * 1;
board.y = appSize[1] * 0.8;
board.scale.set(0.25);

application.stage.addChild(board);

// console.log(board.layers);

// render(appNode, board);
