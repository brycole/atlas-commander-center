import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface KeyIndexInputFields {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface KeyIndexInputJSON {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input that has `key_index` */
export class KeyIndexInput {
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: KeyIndexInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new KeyIndexInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: KeyIndexInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): KeyIndexInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: KeyIndexInputJSON): KeyIndexInput {
    return new KeyIndexInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return KeyIndexInput.toEncodable(this)
  }
}
