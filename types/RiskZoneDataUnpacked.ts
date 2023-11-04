import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RiskZoneDataUnpackedFields {
  /** Risk zone center */
  center: Array<BN>
  /** Risk zone radius */
  radius: BN
}

export interface RiskZoneDataUnpackedJSON {
  /** Risk zone center */
  center: Array<string>
  /** Risk zone radius */
  radius: string
}

/** Unpacked version of [`RiskZoneData`] */
export class RiskZoneDataUnpacked {
  /** Risk zone center */
  readonly center: Array<BN>
  /** Risk zone radius */
  readonly radius: BN

  constructor(fields: RiskZoneDataUnpackedFields) {
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
    return new RiskZoneDataUnpacked({
      center: obj.center,
      radius: obj.radius,
    })
  }

  static toEncodable(fields: RiskZoneDataUnpackedFields) {
    return {
      center: fields.center,
      radius: fields.radius,
    }
  }

  toJSON(): RiskZoneDataUnpackedJSON {
    return {
      center: this.center.map((item) => item.toString()),
      radius: this.radius.toString(),
    }
  }

  static fromJSON(obj: RiskZoneDataUnpackedJSON): RiskZoneDataUnpacked {
    return new RiskZoneDataUnpacked({
      center: obj.center.map((item) => new BN(item)),
      radius: new BN(obj.radius),
    })
  }

  toEncodable() {
    return RiskZoneDataUnpacked.toEncodable(this)
  }
}
