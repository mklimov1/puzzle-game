import { TItemPosition } from "@/src/scripts/types";
import { TItemID, TItemUID } from "../../types";

export type TItemStatus = `active` | `inactive`;

export interface IAbstractItemOptions {
  id: TItemID;
  uid: TItemUID;
  status?: TItemStatus;
  position?: TItemPosition;
}

export interface IAbstractItem {
  uid: TItemUID;
  id: TItemID;
  status: TItemStatus;
  position: TItemPosition;
  isEmpty: boolean;
}
