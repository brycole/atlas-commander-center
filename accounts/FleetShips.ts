import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FleetShipsFields {
  /** The data version of this account. */
  version: number
  /** The `Fleet` account this belongs to */
  fleet: PublicKey
  /** List length of `RemainingData` */
  fleetShipsInfoCount: number
  /** The disbanded fleet's bump. */
  bump: number
}

export interface FleetShipsJSON {
  /** The data version of this account. */
  version: number
  /** The `Fleet` account this belongs to */
  fleet: string
  /** List length of `RemainingData` */
  fleetShipsInfoCount: number
  /** The disbanded fleet's bump. */
  bump: number
}

/** Keeps track of a the individual ships that make up a fleet */
export class FleetShips {
  /** The data version of this account. */
  readonly version: number
  /** The `Fleet` account this belongs to */
  readonly fleet: PublicKey
  /** List length of `RemainingData` */
  readonly fleetShipsInfoCount: number
  /** The disbanded fleet's bump. */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    252, 81, 147, 246, 222, 141, 185, 110,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("fleet"),
    borsh.u32("fleetShipsInfoCount"),
    borsh.u8("bump"),
  ])

  constructor(fields: FleetShipsFields) {
    this.version = fields.version
    this.fleet = fields.fleet
    this.fleetShipsInfoCount = fields.fleetShipsInfoCount
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<FleetShips | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<FleetShips | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): FleetShips {
    if (!data.slice(0, 8).equals(FleetShips.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = FleetShips.layout.decode(data.slice(8))

    return new FleetShips({
      version: dec.version,
      fleet: dec.fleet,
      fleetShipsInfoCount: dec.fleetShipsInfoCount,
      bump: dec.bump,
    })
  }

  toJSON(): FleetShipsJSON {
    return {
      version: this.version,
      fleet: this.fleet.toString(),
      fleetShipsInfoCount: this.fleetShipsInfoCount,
      bump: this.bump,
    }
  }

  static fromJSON(obj: FleetShipsJSON): FleetShips {
    return new FleetShips({
      version: obj.version,
      fleet: new PublicKey(obj.fleet),
      fleetShipsInfoCount: obj.fleetShipsInfoCount,
      bump: obj.bump,
    })
  }
}
