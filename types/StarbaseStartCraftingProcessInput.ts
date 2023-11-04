import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseStartCraftingProcessInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseStartCraftingProcessInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to start a crafting process */
export class StarbaseStartCraftingProcessInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseStartCraftingProcessInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseStartCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseStartCraftingProcessInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseStartCraftingProcessInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseStartCraftingProcessInputJSON
  ): StarbaseStartCraftingProcessInput {
    return new StarbaseStartCraftingProcessInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseStartCraftingProcessInput.toEncodable(this)
  }
}
