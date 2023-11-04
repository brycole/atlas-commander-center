import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseLoadingBayFields {
  /** The `Starbase` is in the loading bay of */
  starbase: PublicKey
  /** The last time this fleet was updated */
  lastUpdate: BN
}

export interface StarbaseLoadingBayJSON {
  /** The `Starbase` is in the loading bay of */
  starbase: string
  /** The last time this fleet was updated */
  lastUpdate: string
}

/** The data for the [`FleetStateData::StarbaseLoadingBay`] state */
export class StarbaseLoadingBay {
  /** The `Starbase` is in the loading bay of */
  readonly starbase: PublicKey
  /** The last time this fleet was updated */
  readonly lastUpdate: BN

  constructor(fields: StarbaseLoadingBayFields) {
    this.starbase = fields.starbase
    this.lastUpdate = fields.lastUpdate
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("starbase"), borsh.i64("lastUpdate")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseLoadingBay({
      starbase: obj.starbase,
      lastUpdate: obj.lastUpdate,
    })
  }

  static toEncodable(fields: StarbaseLoadingBayFields) {
    return {
      starbase: fields.starbase,
      lastUpdate: fields.lastUpdate,
    }
  }

  toJSON(): StarbaseLoadingBayJSON {
    return {
      starbase: this.starbase.toString(),
      lastUpdate: this.lastUpdate.toString(),
    }
  }

  static fromJSON(obj: StarbaseLoadingBayJSON): StarbaseLoadingBay {
    return new StarbaseLoadingBay({
      starbase: new PublicKey(obj.starbase),
      lastUpdate: new BN(obj.lastUpdate),
    })
  }

  toEncodable() {
    return StarbaseLoadingBay.toEncodable(this)
  }
}
