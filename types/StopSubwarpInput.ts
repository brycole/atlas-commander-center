import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StopSubwarpInputFields {
  /** The index of the key in the player profile */
  keyIndex: number
}

export interface StopSubwarpInputJSON {
  /** The index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to stop an `SubwarpMovement` */
export class StopSubwarpInput {
  /** The index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StopSubwarpInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StopSubwarpInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StopSubwarpInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StopSubwarpInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: StopSubwarpInputJSON): StopSubwarpInput {
    return new StopSubwarpInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StopSubwarpInput.toEncodable(this)
  }
}
