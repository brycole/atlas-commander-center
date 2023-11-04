import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitGameStateInputFields {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface InitGameStateInputJSON {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to `InitGameState` */
export class InitGameStateInput {
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: InitGameStateInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitGameStateInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: InitGameStateInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): InitGameStateInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: InitGameStateInputJSON): InitGameStateInput {
    return new InitGameStateInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return InitGameStateInput.toEncodable(this)
  }
}
