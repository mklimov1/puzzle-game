import { TItemID, TItemUID } from "../../types";
import { IAbstractItem, IAbstractItemOptions, TItemStatus } from "./interface";

export class Item implements IAbstractItem {
  private _id: TItemID;
  uid: TItemUID;

  status: TItemStatus;
  isEmpty: boolean;

  constructor(options: IAbstractItemOptions) {
    this._id = null;
    this.isEmpty = true;
    this.id = options.id;
    this.status = options.status ?? `inactive`;
    this.uid = options.uid;
  }

  set id(value: TItemID) {
    const isEmpty = value === null;

    this.isEmpty = isEmpty;

    if (isEmpty) {
      this._id = null;
    } else {
      this._id = value;
    }
  }

  get id(): TItemID {
    return this._id;
  }
}
