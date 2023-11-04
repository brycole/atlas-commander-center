import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ManageGameInputFields {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface ManageGameInputJSON {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to managing Game accounts */
export class ManageGameInput {
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: ManageGameInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ManageGameInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: ManageGameInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): ManageGameInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: ManageGameInputJSON): ManageGameInput {
    return new ManageGameInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return ManageGameInput.toEncodable(this)
  }
}
