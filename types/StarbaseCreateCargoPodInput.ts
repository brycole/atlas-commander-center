import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseCreateCargoPodInputFields {
  /** cargo pod seeds */
  podSeeds: Array<number>
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseCreateCargoPodInputJSON {
  /** cargo pod seeds */
  podSeeds: Array<number>
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to `StarbaseCreateCargoPod` */
export class StarbaseCreateCargoPodInput {
  /** cargo pod seeds */
  readonly podSeeds: Array<number>
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseCreateCargoPodInputFields) {
    this.podSeeds = fields.podSeeds
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.array(borsh.u8(), 32, "podSeeds"), borsh.u16("keyIndex")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseCreateCargoPodInput({
      podSeeds: obj.podSeeds,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseCreateCargoPodInputFields) {
    return {
      podSeeds: fields.podSeeds,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseCreateCargoPodInputJSON {
    return {
      podSeeds: this.podSeeds,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseCreateCargoPodInputJSON
  ): StarbaseCreateCargoPodInput {
    return new StarbaseCreateCargoPodInput({
      podSeeds: obj.podSeeds,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseCreateCargoPodInput.toEncodable(this)
  }
}
