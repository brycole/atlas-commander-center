import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IdleToRespawnInputFields {
  /** index of the key in the player profile */
  keyIndex: number
}

export interface IdleToRespawnInputJSON {
  /** index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to initialize an `IdleToRespawn` Ix */
export class IdleToRespawnInput {
  /** index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: IdleToRespawnInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IdleToRespawnInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: IdleToRespawnInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): IdleToRespawnInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: IdleToRespawnInputJSON): IdleToRespawnInput {
    return new IdleToRespawnInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return IdleToRespawnInput.toEncodable(this)
  }
}
