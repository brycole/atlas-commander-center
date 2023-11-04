import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IdleFields {
  /** The star system the fleet is in */
  sector: Array<BN>
}

export interface IdleJSON {
  /** The star system the fleet is in */
  sector: Array<string>
}

/** The data for the [`FleetStateData::Idle`](crate::state_machine::FleetStateData::Idle) state */
export class Idle {
  /** The star system the fleet is in */
  readonly sector: Array<BN>

  constructor(fields: IdleFields) {
    this.sector = fields.sector
  }

  static layout(property?: string) {
    return borsh.struct([borsh.array(borsh.i64(), 2, "sector")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Idle({
      sector: obj.sector,
    })
  }

  static toEncodable(fields: IdleFields) {
    return {
      sector: fields.sector,
    }
  }

  toJSON(): IdleJSON {
    return {
      sector: this.sector.map((item) => item.toString()),
    }
  }

  static fromJSON(obj: IdleJSON): Idle {
    return new Idle({
      sector: obj.sector.map((item) => new BN(item)),
    })
  }

  toEncodable() {
    return Idle.toEncodable(this)
  }
}
