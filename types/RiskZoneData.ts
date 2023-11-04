import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RiskZoneDataFields {
  /** Risk zone center */
  center: Array<BN>
  /** Risk zone radius */
  radius: BN
}

export interface RiskZoneDataJSON {
  /** Risk zone center */
  center: Array<string>
  /** Risk zone radius */
  radius: string
}

/** `RiskZone` center and radius */
export class RiskZoneData {
  /** Risk zone center */
  readonly center: Array<BN>
  /** Risk zone radius */
  readonly radius: BN

  constructor(fields: RiskZoneDataFields) {
    this.center = fields.center
    this.radius = fields.radius
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.array(borsh.i64(), 2, "center"), borsh.u64("radius")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RiskZoneData({
      center: obj.center,
      radius: obj.radius,
    })
  }

  static toEncodable(fields: RiskZoneDataFields) {
    return {
      center: fields.center,
      radius: fields.radius,
    }
  }

  toJSON(): RiskZoneDataJSON {
    return {
      center: this.center.map((item) => item.toString()),
      radius: this.radius.toString(),
    }
  }

  static fromJSON(obj: RiskZoneDataJSON): RiskZoneData {
    return new RiskZoneData({
      center: obj.center.map((item) => new BN(item)),
      radius: new BN(obj.radius),
    })
  }

  toEncodable() {
    return RiskZoneData.toEncodable(this)
  }
}
