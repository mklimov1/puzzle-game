declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";

declare namespace GlobalMixins {
  interface DisplayObjectEvents {
    itemClicked: [item: DisplayObject];
  }
}
