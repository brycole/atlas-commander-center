import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MineAsteroidToRespawnInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface MineAsteroidToRespawnInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for `MineAsteroidToRespawnInput` */
export class MineAsteroidToRespawnInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: MineAsteroidToRespawnInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MineAsteroidToRespawnInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: MineAsteroidToRespawnInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): MineAsteroidToRespawnInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: MineAsteroidToRespawnInputJSON
  ): MineAsteroidToRespawnInput {
    return new MineAsteroidToRespawnInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return MineAsteroidToRespawnInput.toEncodable(this)
  }
}
