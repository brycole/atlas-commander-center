import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseCloseCraftingProcessInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseCloseCraftingProcessInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to close a `CraftingProcess` */
export class StarbaseCloseCraftingProcessInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseCloseCraftingProcessInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseCloseCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseCloseCraftingProcessInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseCloseCraftingProcessInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseCloseCraftingProcessInputJSON
  ): StarbaseCloseCraftingProcessInput {
    return new StarbaseCloseCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseCloseCraftingProcessInput.toEncodable(this)
  }
}
