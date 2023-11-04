import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterMineItemInputFields {
  /** The name of the `MineItem` */
  name: Array<number>
  /** How hard it is to mine this item */
  resourceHardness: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

export interface RegisterMineItemInputJSON {
  /** The name of the `MineItem` */
  name: Array<number>
  /** How hard it is to mine this item */
  resourceHardness: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

/** Struct for data input to Register a Resource */
export class RegisterMineItemInput {
  /** The name of the `MineItem` */
  readonly name: Array<number>
  /** How hard it is to mine this item */
  readonly resourceHardness: number
  /** the index of the key in the fleet permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterMineItemInputFields) {
    this.name = fields.name
    this.resourceHardness = fields.resourceHardness
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        borsh.u16("resourceHardness"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterMineItemInput({
      name: obj.name,
      resourceHardness: obj.resourceHardness,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterMineItemInputFields) {
    return {
      name: fields.name,
      resourceHardness: fields.resourceHardness,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterMineItemInputJSON {
    return {
      name: this.name,
      resourceHardness: this.resourceHardness,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: RegisterMineItemInputJSON): RegisterMineItemInput {
    return new RegisterMineItemInput({
      name: obj.name,
      resourceHardness: obj.resourceHardness,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterMineItemInput.toEncodable(this)
  }
}
