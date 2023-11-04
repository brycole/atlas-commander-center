import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface WarpToCoordinateInputFields {
  /** The index of the key in the player profile */
  keyIndex: number
  /** The destination coordinates */
  toSector: Array<BN>
}

export interface WarpToCoordinateInputJSON {
  /** The index of the key in the player profile */
  keyIndex: number
  /** The destination coordinates */
  toSector: Array<string>
}

/** Struct for data input to initialize a `WarpToCoordinate` */
export class WarpToCoordinateInput {
  /** The index of the key in the player profile */
  readonly keyIndex: number
  /** The destination coordinates */
  readonly toSector: Array<BN>

  constructor(fields: WarpToCoordinateInputFields) {
    this.keyIndex = fields.keyIndex
    this.toSector = fields.toSector
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("keyIndex"), borsh.array(borsh.i64(), 2, "toSector")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new WarpToCoordinateInput({
      keyIndex: obj.keyIndex,
      toSector: obj.toSector,
    })
  }

  static toEncodable(fields: WarpToCoordinateInputFields) {
    return {
      keyIndex: fields.keyIndex,
      toSector: fields.toSector,
    }
  }

  toJSON(): WarpToCoordinateInputJSON {
    return {
      keyIndex: this.keyIndex,
      toSector: this.toSector.map((item) => item.toString()),
    }
  }

  static fromJSON(obj: WarpToCoordinateInputJSON): WarpToCoordinateInput {
    return new WarpToCoordinateInput({
      keyIndex: obj.keyIndex,
      toSector: obj.toSector.map((item) => new BN(item)),
    })
  }

  toEncodable() {
    return WarpToCoordinateInput.toEncodable(this)
  }
}
