import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface WarpLaneInputFields {
  /** The index of the key in the player profile */
  keyIndex: number
  /** Index of the to_sector in `SectorConnections` of the from_sector */
  toSectorIndex: number
  /** Index of the from_sector in `SectorConnections` of the to_sector */
  fromSectorIndex: number
}

export interface WarpLaneInputJSON {
  /** The index of the key in the player profile */
  keyIndex: number
  /** Index of the to_sector in `SectorConnections` of the from_sector */
  toSectorIndex: number
  /** Index of the from_sector in `SectorConnections` of the to_sector */
  fromSectorIndex: number
}

/** Struct for data input to initialize a `WarpLane` */
export class WarpLaneInput {
  /** The index of the key in the player profile */
  readonly keyIndex: number
  /** Index of the to_sector in `SectorConnections` of the from_sector */
  readonly toSectorIndex: number
  /** Index of the from_sector in `SectorConnections` of the to_sector */
  readonly fromSectorIndex: number

  constructor(fields: WarpLaneInputFields) {
    this.keyIndex = fields.keyIndex
    this.toSectorIndex = fields.toSectorIndex
    this.fromSectorIndex = fields.fromSectorIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u16("keyIndex"),
        borsh.u16("toSectorIndex"),
        borsh.u16("fromSectorIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new WarpLaneInput({
      keyIndex: obj.keyIndex,
      toSectorIndex: obj.toSectorIndex,
      fromSectorIndex: obj.fromSectorIndex,
    })
  }

  static toEncodable(fields: WarpLaneInputFields) {
    return {
      keyIndex: fields.keyIndex,
      toSectorIndex: fields.toSectorIndex,
      fromSectorIndex: fields.fromSectorIndex,
    }
  }

  toJSON(): WarpLaneInputJSON {
    return {
      keyIndex: this.keyIndex,
      toSectorIndex: this.toSectorIndex,
      fromSectorIndex: this.fromSectorIndex,
    }
  }

  static fromJSON(obj: WarpLaneInputJSON): WarpLaneInput {
    return new WarpLaneInput({
      keyIndex: obj.keyIndex,
      toSectorIndex: obj.toSectorIndex,
      fromSectorIndex: obj.fromSectorIndex,
    })
  }

  toEncodable() {
    return WarpLaneInput.toEncodable(this)
  }
}
