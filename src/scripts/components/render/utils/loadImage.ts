import { Assets, Texture } from "pixi.js";

type TTextureSources = string | Record<string | number, string>;
type TTextures = Record<string | number, Texture> | Texture;

export const loadImage = async (src: TTextureSources): Promise<TTextures> => {
  if (typeof src === `string`) {
    return await Assets.load(src).then((texture) => texture);
  }

  Object.entries(src).forEach(([name, path]) => {
    Assets.add(name, path);
  });
  return await Assets.load(Object.keys(src)).then((textures) => textures);
};
