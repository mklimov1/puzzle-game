type TDirectionOptions = `reverse` | `alternate` | `normal`;
type TLoopOptions = boolean | number;

export interface IBaseOptions {
  targets: object | object[];
  value?: number;
  duration: number;
  delay?: number;
  complete?: () => void;
  change?: () => void;
  easing?: string;
  loop?: TLoopOptions;
  direction?: TDirectionOptions;
}
