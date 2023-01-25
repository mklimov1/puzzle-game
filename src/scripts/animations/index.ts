/* eslint-disable @typescript-eslint/no-empty-function */
import { IBaseOptions } from "./interface";
import anime from 'animejs/lib/anime.es';

export const hide = (options: IBaseOptions): void => {
  const { targets,
    duration,
    delay = 0,
    complete = () => {},
    change = () => {},
    easing = `easeInOutQuad`,
    loop = false,
    direction = `normal`,
    value = 0,
  } = options;

  anime({
    targets,
    duration,
    delay,
    complete,
    change,
    easing,
    loop,
    direction,
    alpha: value,
  });
};
