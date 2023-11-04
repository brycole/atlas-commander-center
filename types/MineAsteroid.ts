import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MineAsteroidFields {
  /** The `Asteroid` the `Fleet` is mining (Must be an asteroid belt) */
  asteroid: PublicKey
  /** The `Resource` being mined on the `Asteroid` */
  resource: PublicKey
  /** The timestamp at which mining activity started */
  start: BN
  /** The timestamp at which mining activity stops */
  end: BN
  /** The last time the `Fleet` was updated */
  lastUpdate: BN
}

export interface MineAsteroidJSON {
  /** The `Asteroid` the `Fleet` is mining (Must be an asteroid belt) */
  asteroid: string
  /** The `Resource` being mined on the `Asteroid` */
  resource: string
  /** The timestamp at which mining activity started */
  start: string
  /** The timestamp at which mining activity stops */
  end: string
  /** The last time the `Fleet` was updated */
  lastUpdate: string
}

/** The data for the [`FleetStateData::MineAsteroid`](crate::state_machine::FleetStateData::MineAsteroid) state */
export class MineAsteroid {
  /** The `Asteroid` the `Fleet` is mining (Must be an asteroid belt) */
  readonly asteroid: PublicKey
  /** The `Resource` being mined on the `Asteroid` */
  readonly resource: PublicKey
  /** The timestamp at which mining activity started */
  readonly start: BN
  /** The timestamp at which mining activity stops */
  readonly end: BN
  /** The last time the `Fleet` was updated */
  readonly lastUpdate: BN

  constructor(fields: MineAsteroidFields) {
    this.asteroid = fields.asteroid
    this.resource = fields.resource
    this.start = fields.start
    this.end = fields.end
    this.lastUpdate = fields.lastUpdate
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("asteroid"),
        borsh.publicKey("resource"),
        borsh.i64("start"),
        borsh.i64("end"),
        borsh.i64("lastUpdate"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MineAsteroid({
      asteroid: obj.asteroid,
      resource: obj.resource,
      start: obj.start,
      end: obj.end,
      lastUpdate: obj.lastUpdate,
    })
  }

  static toEncodable(fields: MineAsteroidFields) {
    return {
      asteroid: fields.asteroid,
      resource: fields.resource,
      start: fields.start,
      end: fields.end,
      lastUpdate: fields.lastUpdate,
    }
  }

  toJSON(): MineAsteroidJSON {
    return {
      asteroid: this.asteroid.toString(),
      resource: this.resource.toString(),
      start: this.start.toString(),
      end: this.end.toString(),
      lastUpdate: this.lastUpdate.toString(),
    }
  }

  static fromJSON(obj: MineAsteroidJSON): MineAsteroid {
    return new MineAsteroid({
      asteroid: new PublicKey(obj.asteroid),
      resource: new PublicKey(obj.resource),
      start: new BN(obj.start),
      end: new BN(obj.end),
      lastUpdate: new BN(obj.lastUpdate),
    })
  }

  toEncodable() {
    return MineAsteroid.toEncodable(this)
  }
}
