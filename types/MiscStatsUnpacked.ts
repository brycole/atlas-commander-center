import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MiscStatsUnpackedFields {
  /** Number of crew in the ship */
  crew: BN
  /** the time it takes the ship to respawn */
  respawnTime: number
  /** the time it takes the ship to be able to scan again after scanning */
  scanCoolDown: number
  /** the amount of food required to do a scan */
  scanRepairKitAmount: number
}

export interface MiscStatsUnpackedJSON {
  /** Number of crew in the ship */
  crew: string
  /** the time it takes the ship to respawn */
  respawnTime: number
  /** the time it takes the ship to be able to scan again after scanning */
  scanCoolDown: number
  /** the amount of food required to do a scan */
  scanRepairKitAmount: number
}

/** Unpacked version of [`MiscStats`] */
export class MiscStatsUnpacked {
  /** Number of crew in the ship */
  readonly crew: BN
  /** the time it takes the ship to respawn */
  readonly respawnTime: number
  /** the time it takes the ship to be able to scan again after scanning */
  readonly scanCoolDown: number
  /** the amount of food required to do a scan */
  readonly scanRepairKitAmount: number

  constructor(fields: MiscStatsUnpackedFields) {
    this.crew = fields.crew
    this.respawnTime = fields.respawnTime
    this.scanCoolDown = fields.scanCoolDown
    this.scanRepairKitAmount = fields.scanRepairKitAmount
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("crew"),
        borsh.u16("respawnTime"),
        borsh.u16("scanCoolDown"),
        borsh.u32("scanRepairKitAmount"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MiscStatsUnpacked({
      crew: obj.crew,
      respawnTime: obj.respawnTime,
      scanCoolDown: obj.scanCoolDown,
      scanRepairKitAmount: obj.scanRepairKitAmount,
    })
  }

  static toEncodable(fields: MiscStatsUnpackedFields) {
    return {
      crew: fields.crew,
      respawnTime: fields.respawnTime,
      scanCoolDown: fields.scanCoolDown,
      scanRepairKitAmount: fields.scanRepairKitAmount,
    }
  }

  toJSON(): MiscStatsUnpackedJSON {
    return {
      crew: this.crew.toString(),
      respawnTime: this.respawnTime,
      scanCoolDown: this.scanCoolDown,
      scanRepairKitAmount: this.scanRepairKitAmount,
    }
  }

  static fromJSON(obj: MiscStatsUnpackedJSON): MiscStatsUnpacked {
    return new MiscStatsUnpacked({
      crew: new BN(obj.crew),
      respawnTime: obj.respawnTime,
      scanCoolDown: obj.scanCoolDown,
      scanRepairKitAmount: obj.scanRepairKitAmount,
    })
  }

  toEncodable() {
    return MiscStatsUnpacked.toEncodable(this)
  }
}
