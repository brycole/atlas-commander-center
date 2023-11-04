import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ShipFields {
  /** The data version of this account. */
  version: number
  /** the game_id account this Ship is registered with */
  gameId: PublicKey
  /** the mint representing the Ship */
  mint: PublicKey
  /** The name of this `Ship` */
  name: Array<number>
  /** the ship's size class */
  sizeClass: number
  /** The ship's stats */
  stats: types.ShipStatsFields
  /** The `update_id` for the `Ship` */
  updateId: BN
  /** The max `Game` `update_id` that the `Ship` is valid for */
  maxUpdateId: BN
  /** the next `Ship` account to use when this `Ship` is updated */
  next: types.OptionalNonSystemPubkeyFields
}

export interface ShipJSON {
  /** The data version of this account. */
  version: number
  /** the game_id account this Ship is registered with */
  gameId: string
  /** the mint representing the Ship */
  mint: string
  /** The name of this `Ship` */
  name: Array<number>
  /** the ship's size class */
  sizeClass: number
  /** The ship's stats */
  stats: types.ShipStatsJSON
  /** The `update_id` for the `Ship` */
  updateId: string
  /** The max `Game` `update_id` that the `Ship` is valid for */
  maxUpdateId: string
  /** the next `Ship` account to use when this `Ship` is updated */
  next: types.OptionalNonSystemPubkeyJSON
}

/** This account represents a Ship */
export class Ship {
  /** The data version of this account. */
  readonly version: number
  /** the game_id account this Ship is registered with */
  readonly gameId: PublicKey
  /** the mint representing the Ship */
  readonly mint: PublicKey
  /** The name of this `Ship` */
  readonly name: Array<number>
  /** the ship's size class */
  readonly sizeClass: number
  /** The ship's stats */
  readonly stats: types.ShipStats
  /** The `update_id` for the `Ship` */
  readonly updateId: BN
  /** The max `Game` `update_id` that the `Ship` is valid for */
  readonly maxUpdateId: BN
  /** the next `Ship` account to use when this `Ship` is updated */
  readonly next: types.OptionalNonSystemPubkey

  static readonly discriminator = Buffer.from([
    114, 41, 245, 232, 24, 58, 234, 158,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.publicKey("mint"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.u8("sizeClass"),
    types.ShipStats.layout("stats"),
    borsh.u64("updateId"),
    borsh.u64("maxUpdateId"),
    types.OptionalNonSystemPubkey.layout("next"),
  ])

  constructor(fields: ShipFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.mint = fields.mint
    this.name = fields.name
    this.sizeClass = fields.sizeClass
    this.stats = new types.ShipStats({ ...fields.stats })
    this.updateId = fields.updateId
    this.maxUpdateId = fields.maxUpdateId
    this.next = new types.OptionalNonSystemPubkey({ ...fields.next })
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Ship | null> {
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
  ): Promise<Array<Ship | null>> {
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

  static decode(data: Buffer): Ship {
    if (!data.slice(0, 8).equals(Ship.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Ship.layout.decode(data.slice(8))

    return new Ship({
      version: dec.version,
      gameId: dec.gameId,
      mint: dec.mint,
      name: dec.name,
      sizeClass: dec.sizeClass,
      stats: types.ShipStats.fromDecoded(dec.stats),
      updateId: dec.updateId,
      maxUpdateId: dec.maxUpdateId,
      next: types.OptionalNonSystemPubkey.fromDecoded(dec.next),
    })
  }

  toJSON(): ShipJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      mint: this.mint.toString(),
      name: this.name,
      sizeClass: this.sizeClass,
      stats: this.stats.toJSON(),
      updateId: this.updateId.toString(),
      maxUpdateId: this.maxUpdateId.toString(),
      next: this.next.toJSON(),
    }
  }

  static fromJSON(obj: ShipJSON): Ship {
    return new Ship({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      mint: new PublicKey(obj.mint),
      name: obj.name,
      sizeClass: obj.sizeClass,
      stats: types.ShipStats.fromJSON(obj.stats),
      updateId: new BN(obj.updateId),
      maxUpdateId: new BN(obj.maxUpdateId),
      next: types.OptionalNonSystemPubkey.fromJSON(obj.next),
    })
  }
}
