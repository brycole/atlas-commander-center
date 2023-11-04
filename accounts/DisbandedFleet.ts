import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DisbandedFleetFields {
  /** The data version of this account. */
  version: number
  /** The game id this belongs to. */
  gameId: PublicKey
  /** The owner's profile. */
  ownerProfile: PublicKey
  /** The `Starbase` at which the original `Fleet` was disbanded. */
  starbase: PublicKey
  /** The label or name of the disbanded fleet. */
  fleetLabel: Array<number>
  /** The `FleetShips` account belonging to the original `Fleet` that was disbanded. */
  fleetShips: PublicKey
  /** The disbanded fleet's bump. */
  bump: number
}

export interface DisbandedFleetJSON {
  /** The data version of this account. */
  version: number
  /** The game id this belongs to. */
  gameId: string
  /** The owner's profile. */
  ownerProfile: string
  /** The `Starbase` at which the original `Fleet` was disbanded. */
  starbase: string
  /** The label or name of the disbanded fleet. */
  fleetLabel: Array<number>
  /** The `FleetShips` account belonging to the original `Fleet` that was disbanded. */
  fleetShips: string
  /** The disbanded fleet's bump. */
  bump: number
}

/** Keeps track of a fleet while it is disbanded */
export class DisbandedFleet {
  /** The data version of this account. */
  readonly version: number
  /** The game id this belongs to. */
  readonly gameId: PublicKey
  /** The owner's profile. */
  readonly ownerProfile: PublicKey
  /** The `Starbase` at which the original `Fleet` was disbanded. */
  readonly starbase: PublicKey
  /** The label or name of the disbanded fleet. */
  readonly fleetLabel: Array<number>
  /** The `FleetShips` account belonging to the original `Fleet` that was disbanded. */
  readonly fleetShips: PublicKey
  /** The disbanded fleet's bump. */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    53, 6, 127, 23, 247, 12, 225, 249,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.publicKey("ownerProfile"),
    borsh.publicKey("starbase"),
    borsh.array(borsh.u8(), 32, "fleetLabel"),
    borsh.publicKey("fleetShips"),
    borsh.u8("bump"),
  ])

  constructor(fields: DisbandedFleetFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.ownerProfile = fields.ownerProfile
    this.starbase = fields.starbase
    this.fleetLabel = fields.fleetLabel
    this.fleetShips = fields.fleetShips
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<DisbandedFleet | null> {
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
  ): Promise<Array<DisbandedFleet | null>> {
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

  static decode(data: Buffer): DisbandedFleet {
    if (!data.slice(0, 8).equals(DisbandedFleet.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = DisbandedFleet.layout.decode(data.slice(8))

    return new DisbandedFleet({
      version: dec.version,
      gameId: dec.gameId,
      ownerProfile: dec.ownerProfile,
      starbase: dec.starbase,
      fleetLabel: dec.fleetLabel,
      fleetShips: dec.fleetShips,
      bump: dec.bump,
    })
  }

  toJSON(): DisbandedFleetJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      ownerProfile: this.ownerProfile.toString(),
      starbase: this.starbase.toString(),
      fleetLabel: this.fleetLabel,
      fleetShips: this.fleetShips.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: DisbandedFleetJSON): DisbandedFleet {
    return new DisbandedFleet({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      ownerProfile: new PublicKey(obj.ownerProfile),
      starbase: new PublicKey(obj.starbase),
      fleetLabel: obj.fleetLabel,
      fleetShips: new PublicKey(obj.fleetShips),
      bump: obj.bump,
    })
  }
}
