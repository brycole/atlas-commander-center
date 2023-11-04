import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseUpgradeTaskFields {
  /** The `Fleet` Pubkey */
  fleet: PublicKey
  /** The timestamp at which the fleet completes its contribution to the upgrade */
  completionTime: BN
}

export interface StarbaseUpgradeTaskJSON {
  /** The `Fleet` Pubkey */
  fleet: string
  /** The timestamp at which the fleet completes its contribution to the upgrade */
  completionTime: string
}

/** `Starbase` upgrade task item */
export class StarbaseUpgradeTask {
  /** The `Fleet` Pubkey */
  readonly fleet: PublicKey
  /** The timestamp at which the fleet completes its contribution to the upgrade */
  readonly completionTime: BN

  constructor(fields: StarbaseUpgradeTaskFields) {
    this.fleet = fields.fleet
    this.completionTime = fields.completionTime
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("fleet"), borsh.i64("completionTime")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseUpgradeTask({
      fleet: obj.fleet,
      completionTime: obj.completionTime,
    })
  }

  static toEncodable(fields: StarbaseUpgradeTaskFields) {
    return {
      fleet: fields.fleet,
      completionTime: fields.completionTime,
    }
  }

  toJSON(): StarbaseUpgradeTaskJSON {
    return {
      fleet: this.fleet.toString(),
      completionTime: this.completionTime.toString(),
    }
  }

  static fromJSON(obj: StarbaseUpgradeTaskJSON): StarbaseUpgradeTask {
    return new StarbaseUpgradeTask({
      fleet: new PublicKey(obj.fleet),
      completionTime: new BN(obj.completionTime),
    })
  }

  toEncodable() {
    return StarbaseUpgradeTask.toEncodable(this)
  }
}
