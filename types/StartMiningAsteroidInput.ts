import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StartMiningAsteroidInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StartMiningAsteroidInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for `StartMiningAsteroid` */
export class StartMiningAsteroidInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StartMiningAsteroidInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StartMiningAsteroidInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StartMiningAsteroidInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StartMiningAsteroidInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: StartMiningAsteroidInputJSON): StartMiningAsteroidInput {
    return new StartMiningAsteroidInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StartMiningAsteroidInput.toEncodable(this)
  }
}
