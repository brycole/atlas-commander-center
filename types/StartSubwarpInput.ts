import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StartSubwarpInputFields {
  /** The destination coordinates */
  toSector: Array<BN>
  /** The index of the key in the player profile */
  keyIndex: number
}

export interface StartSubwarpInputJSON {
  /** The destination coordinates */
  toSector: Array<string>
  /** The index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to initialize an `SubwarpMovement` */
export class StartSubwarpInput {
  /** The destination coordinates */
  readonly toSector: Array<BN>
  /** The index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StartSubwarpInputFields) {
    this.toSector = fields.toSector
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.array(borsh.i64(), 2, "toSector"), borsh.u16("keyIndex")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StartSubwarpInput({
      toSector: obj.toSector,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StartSubwarpInputFields) {
    return {
      toSector: fields.toSector,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StartSubwarpInputJSON {
    return {
      toSector: this.toSector.map((item) => item.toString()),
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: StartSubwarpInputJSON): StartSubwarpInput {
    return new StartSubwarpInput({
      toSector: obj.toSector.map((item) => new BN(item)),
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StartSubwarpInput.toEncodable(this)
  }
}
