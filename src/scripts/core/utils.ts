import { utils } from "pixi.js";
import { AbstractItem } from "../components/abstract/Item";
import { TItemID } from "../components/types";
import { TItemPosition } from "../types";

export const getUID = (): number => utils.uid();

export const createAbstractItem = (id: TItemID, position: TItemPosition) => new AbstractItem({
  id,
  position,
  uid: getUID(),
  status: `inactive`,
});

export function sortByPosition<T extends { position: TItemPosition }> (array: T[]): T[] {
  return array.sort(({ position: p1, }, { position: p2, }) => {
    if (p1.z > p2.z || p1.y > p2.y || p1.x > p2.x) {
      return 1;
    }

    return -1;
  });
}

export const getBoardSizeByPosition = (positions: TItemPosition[] ) => {
  return positions.reduce((prevValue, value) => {
    return {
      width: prevValue.width < value.x + 1 ? value.x + 1 : prevValue.width,
      height: prevValue.height < value.y + 1 ? value.y + 1 : prevValue.height,
    };
  }, { width: 0, height: 0, });
};

export const mapValuesByProperty = <T>(property: keyof T, array: T[]) => {
  if (
    array.length <= 0
  ) return {};

  type TValue = string | number | symbol;
  type TMap = { [x: TValue]: T[] };

  return array.reduce((compares, elem) => {
    const key = elem[property] as TValue;

    if (!(compares[key] as T[])) {
      compares[key] = [];
    }

    compares[key].push(elem);

    return compares;
  }, {} as TMap) as { [x: TValue]: T[] };
};
