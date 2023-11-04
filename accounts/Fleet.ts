import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FleetFields {
  /** The data version of this account. */
  version: number
  /** The game id this belongs to. */
  gameId: PublicKey
  /** The owner's profile. */
  ownerProfile: PublicKey
  /** Fleet Ships Key */
  fleetShips: PublicKey
  /**
   * The fleet's sub-authority.
   * If [`Some`] will have the exclusive ability to interact with this fleet.
   */
  subProfile: types.OptionalNonSystemPubkeyFields
  /** The authority for revoking a sun-authority. */
  subProfileInvalidator: PublicKey
  /** The label or name of the fleet. */
  fleetLabel: Array<number>
  /** The number of ships in the fleet. */
  shipCounts: types.ShipCountsFields
  /** The time at which the warp cooldown expires */
  warpCooldownExpiresAt: BN
  /** The time at which the scan cooldown expires */
  scanCooldownExpiresAt: BN
  /** The fleet's stats. */
  stats: types.ShipStatsFields
  /** The Cargo pod representing the fleet's cargo hold */
  cargoHold: PublicKey
  /** The Cargo pod representing the fleet's fuel tank */
  fuelTank: PublicKey
  /** The Cargo pod representing the fleet's ammo bank */
  ammoBank: PublicKey
  /** The update id for the `Fleet` */
  updateId: BN
  /** The fleet's bump. */
  bump: number
}

export interface FleetJSON {
  /** The data version of this account. */
  version: number
  /** The game id this belongs to. */
  gameId: string
  /** The owner's profile. */
  ownerProfile: string
  /** Fleet Ships Key */
  fleetShips: string
  /**
   * The fleet's sub-authority.
   * If [`Some`] will have the exclusive ability to interact with this fleet.
   */
  subProfile: types.OptionalNonSystemPubkeyJSON
  /** The authority for revoking a sun-authority. */
  subProfileInvalidator: string
  /** The label or name of the fleet. */
  fleetLabel: Array<number>
  /** The number of ships in the fleet. */
  shipCounts: types.ShipCountsJSON
  /** The time at which the warp cooldown expires */
  warpCooldownExpiresAt: string
  /** The time at which the scan cooldown expires */
  scanCooldownExpiresAt: string
  /** The fleet's stats. */
  stats: types.ShipStatsJSON
  /** The Cargo pod representing the fleet's cargo hold */
  cargoHold: string
  /** The Cargo pod representing the fleet's fuel tank */
  fuelTank: string
  /** The Cargo pod representing the fleet's ammo bank */
  ammoBank: string
  /** The update id for the `Fleet` */
  updateId: string
  /** The fleet's bump. */
  bump: number
}

/** A `SAGE` fleet. */
export class Fleet {
  /** The data version of this account. */
  readonly version: number
  /** The game id this belongs to. */
  readonly gameId: PublicKey
  /** The owner's profile. */
  readonly ownerProfile: PublicKey
  /** Fleet Ships Key */
  readonly fleetShips: PublicKey
  /**
   * The fleet's sub-authority.
   * If [`Some`] will have the exclusive ability to interact with this fleet.
   */
  readonly subProfile: types.OptionalNonSystemPubkey
  /** The authority for revoking a sun-authority. */
  readonly subProfileInvalidator: PublicKey
  /** The label or name of the fleet. */
  readonly fleetLabel: Array<number>
  /** The number of ships in the fleet. */
  readonly shipCounts: types.ShipCounts
  /** The time at which the warp cooldown expires */
  readonly warpCooldownExpiresAt: BN
  /** The time at which the scan cooldown expires */
  readonly scanCooldownExpiresAt: BN
  /** The fleet's stats. */
  readonly stats: types.ShipStats
  /** The Cargo pod representing the fleet's cargo hold */
  readonly cargoHold: PublicKey
  /** The Cargo pod representing the fleet's fuel tank */
  readonly fuelTank: PublicKey
  /** The Cargo pod representing the fleet's ammo bank */
  readonly ammoBank: PublicKey
  /** The update id for the `Fleet` */
  readonly updateId: BN
  /** The fleet's bump. */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    109, 207, 251, 48, 106, 2, 136, 163,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.publicKey("ownerProfile"),
    borsh.publicKey("fleetShips"),
    types.OptionalNonSystemPubkey.layout("subProfile"),
    borsh.publicKey("subProfileInvalidator"),
    borsh.array(borsh.u8(), 32, "fleetLabel"),
    types.ShipCounts.layout("shipCounts"),
    borsh.i64("warpCooldownExpiresAt"),
    borsh.i64("scanCooldownExpiresAt"),
    types.ShipStats.layout("stats"),
    borsh.publicKey("cargoHold"),
    borsh.publicKey("fuelTank"),
    borsh.publicKey("ammoBank"),
    borsh.u64("updateId"),
    borsh.u8("bump"),
  ])

  constructor(fields: FleetFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.ownerProfile = fields.ownerProfile
    this.fleetShips = fields.fleetShips
    this.subProfile = new types.OptionalNonSystemPubkey({
      ...fields.subProfile,
    })
    this.subProfileInvalidator = fields.subProfileInvalidator
    this.fleetLabel = fields.fleetLabel
    this.shipCounts = new types.ShipCounts({ ...fields.shipCounts })
    this.warpCooldownExpiresAt = fields.warpCooldownExpiresAt
    this.scanCooldownExpiresAt = fields.scanCooldownExpiresAt
    this.stats = new types.ShipStats({ ...fields.stats })
    this.cargoHold = fields.cargoHold
    this.fuelTank = fields.fuelTank
    this.ammoBank = fields.ammoBank
    this.updateId = fields.updateId
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Fleet | null> {
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
  ): Promise<Array<Fleet | null>> {
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

  static decode(data: Buffer): Fleet {
    if (!data.slice(0, 8).equals(Fleet.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Fleet.layout.decode(data.slice(8))

    return new Fleet({
      version: dec.version,
      gameId: dec.gameId,
      ownerProfile: dec.ownerProfile,
      fleetShips: dec.fleetShips,
      subProfile: types.OptionalNonSystemPubkey.fromDecoded(dec.subProfile),
      subProfileInvalidator: dec.subProfileInvalidator,
      fleetLabel: dec.fleetLabel,
      shipCounts: types.ShipCounts.fromDecoded(dec.shipCounts),
      warpCooldownExpiresAt: dec.warpCooldownExpiresAt,
      scanCooldownExpiresAt: dec.scanCooldownExpiresAt,
      stats: types.ShipStats.fromDecoded(dec.stats),
      cargoHold: dec.cargoHold,
      fuelTank: dec.fuelTank,
      ammoBank: dec.ammoBank,
      updateId: dec.updateId,
      bump: dec.bump,
    })
  }

  toJSON(): FleetJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      ownerProfile: this.ownerProfile.toString(),
      fleetShips: this.fleetShips.toString(),
      subProfile: this.subProfile.toJSON(),
      subProfileInvalidator: this.subProfileInvalidator.toString(),
      fleetLabel: this.fleetLabel,
      shipCounts: this.shipCounts.toJSON(),
      warpCooldownExpiresAt: this.warpCooldownExpiresAt.toString(),
      scanCooldownExpiresAt: this.scanCooldownExpiresAt.toString(),
      stats: this.stats.toJSON(),
      cargoHold: this.cargoHold.toString(),
      fuelTank: this.fuelTank.toString(),
      ammoBank: this.ammoBank.toString(),
      updateId: this.updateId.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: FleetJSON): Fleet {
    return new Fleet({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      ownerProfile: new PublicKey(obj.ownerProfile),
      fleetShips: new PublicKey(obj.fleetShips),
      subProfile: types.OptionalNonSystemPubkey.fromJSON(obj.subProfile),
      subProfileInvalidator: new PublicKey(obj.subProfileInvalidator),
      fleetLabel: obj.fleetLabel,
      shipCounts: types.ShipCounts.fromJSON(obj.shipCounts),
      warpCooldownExpiresAt: new BN(obj.warpCooldownExpiresAt),
      scanCooldownExpiresAt: new BN(obj.scanCooldownExpiresAt),
      stats: types.ShipStats.fromJSON(obj.stats),
      cargoHold: new PublicKey(obj.cargoHold),
      fuelTank: new PublicKey(obj.fuelTank),
      ammoBank: new PublicKey(obj.ammoBank),
      updateId: new BN(obj.updateId),
      bump: obj.bump,
    })
  }
}
