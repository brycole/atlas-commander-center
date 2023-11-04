import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StopMiningAsteroidInputFields {
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StopMiningAsteroidInputJSON {
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for `StopMiningAsteroidInput` */
export class StopMiningAsteroidInput {
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StopMiningAsteroidInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StopMiningAsteroidInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StopMiningAsteroidInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StopMiningAsteroidInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: StopMiningAsteroidInputJSON): StopMiningAsteroidInput {
    return new StopMiningAsteroidInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StopMiningAsteroidInput.toEncodable(this)
  }
}
