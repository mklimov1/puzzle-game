import { TItemID } from "../../types";

export type TItemStatus = `active` | `inactive`;

export interface IAbstractItemOptions {
  id: TItemID;
  status?: TItemStatus;
}

export interface IAbstractItem {
  id: TItemID;
  status: TItemStatus;
  isEmpty: boolean;
}
