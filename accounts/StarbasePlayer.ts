import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StarbasePlayerFields {
  /** The data version of this account */
  version: number
  /** The `Profile` key */
  playerProfile: PublicKey
  /** The id of the `Game` */
  gameId: PublicKey
  /** The `Starbase` key */
  starbase: PublicKey
  /** The `SagePlayerProfile` key */
  sagePlayerProfile: PublicKey
  /** Bump of Account PDA */
  bump: number
  /** List length of `RemainingData` */
  shipEscrowCount: number
  /** The total crew members from the player's fleets at the `Starbase` */
  totalCrew: BN
  /** The number of crew members that is engaged/busy and not available */
  busyCrew: BN
  /** The `Game` update id */
  updateId: BN
  /**
   * Number of updated items in `RemainingData` list
   * This will be `ship_escrow_count` when all ships in escrow are up-to-date
   */
  updatedShipEscrowCount: number
}

export interface StarbasePlayerJSON {
  /** The data version of this account */
  version: number
  /** The `Profile` key */
  playerProfile: string
  /** The id of the `Game` */
  gameId: string
  /** The `Starbase` key */
  starbase: string
  /** The `SagePlayerProfile` key */
  sagePlayerProfile: string
  /** Bump of Account PDA */
  bump: number
  /** List length of `RemainingData` */
  shipEscrowCount: number
  /** The total crew members from the player's fleets at the `Starbase` */
  totalCrew: string
  /** The number of crew members that is engaged/busy and not available */
  busyCrew: string
  /** The `Game` update id */
  updateId: string
  /**
   * Number of updated items in `RemainingData` list
   * This will be `ship_escrow_count` when all ships in escrow are up-to-date
   */
  updatedShipEscrowCount: number
}

/** The `SAGE` player info within a `Starbase` */
export class StarbasePlayer {
  /** The data version of this account */
  readonly version: number
  /** The `Profile` key */
  readonly playerProfile: PublicKey
  /** The id of the `Game` */
  readonly gameId: PublicKey
  /** The `Starbase` key */
  readonly starbase: PublicKey
  /** The `SagePlayerProfile` key */
  readonly sagePlayerProfile: PublicKey
  /** Bump of Account PDA */
  readonly bump: number
  /** List length of `RemainingData` */
  readonly shipEscrowCount: number
  /** The total crew members from the player's fleets at the `Starbase` */
  readonly totalCrew: BN
  /** The number of crew members that is engaged/busy and not available */
  readonly busyCrew: BN
  /** The `Game` update id */
  readonly updateId: BN
  /**
   * Number of updated items in `RemainingData` list
   * This will be `ship_escrow_count` when all ships in escrow are up-to-date
   */
  readonly updatedShipEscrowCount: number

  static readonly discriminator = Buffer.from([
    192, 234, 144, 86, 72, 19, 5, 99,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("playerProfile"),
    borsh.publicKey("gameId"),
    borsh.publicKey("starbase"),
    borsh.publicKey("sagePlayerProfile"),
    borsh.u8("bump"),
    borsh.u32("shipEscrowCount"),
    borsh.u64("totalCrew"),
    borsh.u64("busyCrew"),
    borsh.u64("updateId"),
    borsh.u32("updatedShipEscrowCount"),
  ])

  constructor(fields: StarbasePlayerFields) {
    this.version = fields.version
    this.playerProfile = fields.playerProfile
    this.gameId = fields.gameId
    this.starbase = fields.starbase
    this.sagePlayerProfile = fields.sagePlayerProfile
    this.bump = fields.bump
    this.shipEscrowCount = fields.shipEscrowCount
    this.totalCrew = fields.totalCrew
    this.busyCrew = fields.busyCrew
    this.updateId = fields.updateId
    this.updatedShipEscrowCount = fields.updatedShipEscrowCount
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<StarbasePlayer | null> {
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
  ): Promise<Array<StarbasePlayer | null>> {
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

  static decode(data: Buffer): StarbasePlayer {
    if (!data.slice(0, 8).equals(StarbasePlayer.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = StarbasePlayer.layout.decode(data.slice(8))

    return new StarbasePlayer({
      version: dec.version,
      playerProfile: dec.playerProfile,
      gameId: dec.gameId,
      starbase: dec.starbase,
      sagePlayerProfile: dec.sagePlayerProfile,
      bump: dec.bump,
      shipEscrowCount: dec.shipEscrowCount,
      totalCrew: dec.totalCrew,
      busyCrew: dec.busyCrew,
      updateId: dec.updateId,
      updatedShipEscrowCount: dec.updatedShipEscrowCount,
    })
  }

  toJSON(): StarbasePlayerJSON {
    return {
      version: this.version,
      playerProfile: this.playerProfile.toString(),
      gameId: this.gameId.toString(),
      starbase: this.starbase.toString(),
      sagePlayerProfile: this.sagePlayerProfile.toString(),
      bump: this.bump,
      shipEscrowCount: this.shipEscrowCount,
      totalCrew: this.totalCrew.toString(),
      busyCrew: this.busyCrew.toString(),
      updateId: this.updateId.toString(),
      updatedShipEscrowCount: this.updatedShipEscrowCount,
    }
  }

  static fromJSON(obj: StarbasePlayerJSON): StarbasePlayer {
    return new StarbasePlayer({
      version: obj.version,
      playerProfile: new PublicKey(obj.playerProfile),
      gameId: new PublicKey(obj.gameId),
      starbase: new PublicKey(obj.starbase),
      sagePlayerProfile: new PublicKey(obj.sagePlayerProfile),
      bump: obj.bump,
      shipEscrowCount: obj.shipEscrowCount,
      totalCrew: new BN(obj.totalCrew),
      busyCrew: new BN(obj.busyCrew),
      updateId: new BN(obj.updateId),
      updatedShipEscrowCount: obj.updatedShipEscrowCount,
    })
  }
}
