import { TItemID, TItemUID } from "../../types";

export type TItemStatus = `active` | `inactive`;

export interface IAbstractItemOptions {
  id: TItemID;
  uid: TItemUID;
  status?: TItemStatus;
}

export interface IAbstractItem {
  uid: TItemUID;
  id: TItemID;
  status: TItemStatus;
  isEmpty: boolean;
}
