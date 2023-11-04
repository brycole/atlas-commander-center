import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CloseDisbandedFleetInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface CloseDisbandedFleetInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for that has `key_index` */
export class CloseDisbandedFleetInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: CloseDisbandedFleetInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CloseDisbandedFleetInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: CloseDisbandedFleetInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): CloseDisbandedFleetInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: CloseDisbandedFleetInputJSON): CloseDisbandedFleetInput {
    return new CloseDisbandedFleetInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return CloseDisbandedFleetInput.toEncodable(this)
  }
}
