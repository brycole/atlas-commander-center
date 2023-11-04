import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseRemoveCargoPodInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseRemoveCargoPodInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to `StarbaseRemoveCargoPod` */
export class StarbaseRemoveCargoPodInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseRemoveCargoPodInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseRemoveCargoPodInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseRemoveCargoPodInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseRemoveCargoPodInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseRemoveCargoPodInputJSON
  ): StarbaseRemoveCargoPodInput {
    return new StarbaseRemoveCargoPodInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseRemoveCargoPodInput.toEncodable(this)
  }
}
