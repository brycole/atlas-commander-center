import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RespawnToLoadingBayInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface RespawnToLoadingBayInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to `RespawnToLoadingBay` */
export class RespawnToLoadingBayInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: RespawnToLoadingBayInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RespawnToLoadingBayInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RespawnToLoadingBayInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RespawnToLoadingBayInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: RespawnToLoadingBayInputJSON): RespawnToLoadingBayInput {
    return new RespawnToLoadingBayInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RespawnToLoadingBayInput.toEncodable(this)
  }
}
