import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MoveWarpFields {
  /** The star system the fleet is coming from */
  fromSector: Array<BN>
  /** The star system the fleet is going to */
  toSector: Array<BN>
  /** When the fleet started warping */
  warpStart: BN
  /** When the warp will end */
  warpFinish: BN
}

export interface MoveWarpJSON {
  /** The star system the fleet is coming from */
  fromSector: Array<string>
  /** The star system the fleet is going to */
  toSector: Array<string>
  /** When the fleet started warping */
  warpStart: string
  /** When the warp will end */
  warpFinish: string
}

/** The data for the [`FleetStateData::MoveWarp`] state */
export class MoveWarp {
  /** The star system the fleet is coming from */
  readonly fromSector: Array<BN>
  /** The star system the fleet is going to */
  readonly toSector: Array<BN>
  /** When the fleet started warping */
  readonly warpStart: BN
  /** When the warp will end */
  readonly warpFinish: BN

  constructor(fields: MoveWarpFields) {
    this.fromSector = fields.fromSector
    this.toSector = fields.toSector
    this.warpStart = fields.warpStart
    this.warpFinish = fields.warpFinish
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.i64(), 2, "fromSector"),
        borsh.array(borsh.i64(), 2, "toSector"),
        borsh.i64("warpStart"),
        borsh.i64("warpFinish"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MoveWarp({
      fromSector: obj.fromSector,
      toSector: obj.toSector,
      warpStart: obj.warpStart,
      warpFinish: obj.warpFinish,
    })
  }

  static toEncodable(fields: MoveWarpFields) {
    return {
      fromSector: fields.fromSector,
      toSector: fields.toSector,
      warpStart: fields.warpStart,
      warpFinish: fields.warpFinish,
    }
  }

  toJSON(): MoveWarpJSON {
    return {
      fromSector: this.fromSector.map((item) => item.toString()),
      toSector: this.toSector.map((item) => item.toString()),
      warpStart: this.warpStart.toString(),
      warpFinish: this.warpFinish.toString(),
    }
  }

  static fromJSON(obj: MoveWarpJSON): MoveWarp {
    return new MoveWarp({
      fromSector: obj.fromSector.map((item) => new BN(item)),
      toSector: obj.toSector.map((item) => new BN(item)),
      warpStart: new BN(obj.warpStart),
      warpFinish: new BN(obj.warpFinish),
    })
  }

  toEncodable() {
    return MoveWarp.toEncodable(this)
  }
}
