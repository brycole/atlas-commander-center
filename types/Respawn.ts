import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RespawnFields {
  /** The star system the fleet was in when it entered the `Respawn` state */
  sector: Array<BN>
  /** The time `Respawn` started */
  start: BN
}

export interface RespawnJSON {
  /** The star system the fleet was in when it entered the `Respawn` state */
  sector: Array<string>
  /** The time `Respawn` started */
  start: string
}

/** The data for the [`FleetStateData::Respawn`](crate::state_machine::FleetStateData::Respawn) state */
export class Respawn {
  /** The star system the fleet was in when it entered the `Respawn` state */
  readonly sector: Array<BN>
  /** The time `Respawn` started */
  readonly start: BN

  constructor(fields: RespawnFields) {
    this.sector = fields.sector
    this.start = fields.start
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.array(borsh.i64(), 2, "sector"), borsh.i64("start")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Respawn({
      sector: obj.sector,
      start: obj.start,
    })
  }

  static toEncodable(fields: RespawnFields) {
    return {
      sector: fields.sector,
      start: fields.start,
    }
  }

  toJSON(): RespawnJSON {
    return {
      sector: this.sector.map((item) => item.toString()),
      start: this.start.toString(),
    }
  }

  static fromJSON(obj: RespawnJSON): Respawn {
    return new Respawn({
      sector: obj.sector.map((item) => new BN(item)),
      start: new BN(obj.start),
    })
  }

  toEncodable() {
    return Respawn.toEncodable(this)
  }
}
