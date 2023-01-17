import { Application, Graphics, Renderer } from "pixi.js";
import "../styles/styles.sass";
import { AbstractBoard } from "./components/abstract/Board";
import { Board } from "./components/render/Board";
import { TBoardOptions } from "./components/render/Board/interface";

const getColorTexture = (renderer: Renderer, width: number, height: number, color: number, alpha = 1) => {
  // const renderer = autoDetectRenderer();
  const rect = new Graphics().beginFill(color, alpha).drawRect(0, 0, width, height).endFill();
  const texture = renderer.generateTexture(rect);

  return texture;
};

const application = new Application();
const renderer = application.renderer as Renderer;
const textureSize: [number, number] = [100, 100];
const itemTextures = [
  getColorTexture(renderer, ...textureSize, 0xff0000, 1),
  getColorTexture(renderer, ...textureSize, 0x00ff00, 1),
  getColorTexture(renderer, ...textureSize, 0x0000ff, 1)
];
// const boardPreset = [[[0, null, 0], [0, null, 0], [0, 0, null]], [[1, null, 1], [1, 1, null], [null, 1, 1]], [[null, 2, 2], [2, 2, null], [2, null, 2]]];
const boardPreset = [[[0, null, 0], [0, null, 0], [0, 0, null]], [[null, null, 1], [1, 1, null], [null, 1, 1]], [[null, 2, 2], [2, 2, null], [2, null, 2]]];

const abstractBoard = new AbstractBoard({ boardPreset: boardPreset, });

const boardOptions: TBoardOptions = {
  abstractBoard,
  itemTextures,
};
const board = new Board(boardOptions);
const appWrapper = document.querySelector(`#app`) as HTMLElement;
const appSize: [number, number] = [appWrapper.clientWidth, appWrapper.clientHeight];

appWrapper.appendChild(application.view as HTMLCanvasElement);

application.renderer.resize(...appSize);

board.x = appSize[0] * 0.5;
board.y = appSize[1] * 0.5;

application.stage.addChild(board);

// console.log(board.layers);

// render(appNode, board);
