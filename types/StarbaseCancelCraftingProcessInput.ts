import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseCancelCraftingProcessInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseCancelCraftingProcessInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to cancel a `CraftingProcess` */
export class StarbaseCancelCraftingProcessInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseCancelCraftingProcessInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseCancelCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseCancelCraftingProcessInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseCancelCraftingProcessInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseCancelCraftingProcessInputJSON
  ): StarbaseCancelCraftingProcessInput {
    return new StarbaseCancelCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseCancelCraftingProcessInput.toEncodable(this)
  }
}
