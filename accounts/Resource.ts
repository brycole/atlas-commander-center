import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ResourceFields {
  /** The data version of this account. */
  version: number
  /** the game_id pubkey */
  gameId: PublicKey
  /** the location's pubkey */
  location: PublicKey
  /** the mine item pubkey */
  mineItem: PublicKey
  /** the location type */
  locationType: number
  /** How abundant the resource is at the location -> Ranges from 1-5 */
  systemRichness: number
  /** the cumulative amount mined from this resource */
  amountMined: BN
  /** the number of entities currently mining this resource */
  numMiners: BN
  /** The `MineItem` update id */
  mineItemUpdateId: BN
  /** The `Resource` update id */
  resourceUpdateId: BN
  /** bump for PDA */
  bump: number
}

export interface ResourceJSON {
  /** The data version of this account. */
  version: number
  /** the game_id pubkey */
  gameId: string
  /** the location's pubkey */
  location: string
  /** the mine item pubkey */
  mineItem: string
  /** the location type */
  locationType: number
  /** How abundant the resource is at the location -> Ranges from 1-5 */
  systemRichness: number
  /** the cumulative amount mined from this resource */
  amountMined: string
  /** the number of entities currently mining this resource */
  numMiners: string
  /** The `MineItem` update id */
  mineItemUpdateId: string
  /** The `Resource` update id */
  resourceUpdateId: string
  /** bump for PDA */
  bump: number
}

/** Represents a mine-able item existing at a particular location (e.g. a planet) */
export class Resource {
  /** The data version of this account. */
  readonly version: number
  /** the game_id pubkey */
  readonly gameId: PublicKey
  /** the location's pubkey */
  readonly location: PublicKey
  /** the mine item pubkey */
  readonly mineItem: PublicKey
  /** the location type */
  readonly locationType: number
  /** How abundant the resource is at the location -> Ranges from 1-5 */
  readonly systemRichness: number
  /** the cumulative amount mined from this resource */
  readonly amountMined: BN
  /** the number of entities currently mining this resource */
  readonly numMiners: BN
  /** The `MineItem` update id */
  readonly mineItemUpdateId: BN
  /** The `Resource` update id */
  readonly resourceUpdateId: BN
  /** bump for PDA */
  readonly bump: number

  static readonly discriminator = Buffer.from([10, 160, 2, 1, 42, 207, 51, 212])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.publicKey("location"),
    borsh.publicKey("mineItem"),
    borsh.u8("locationType"),
    borsh.u16("systemRichness"),
    borsh.u64("amountMined"),
    borsh.u64("numMiners"),
    borsh.u64("mineItemUpdateId"),
    borsh.u64("resourceUpdateId"),
    borsh.u8("bump"),
  ])

  constructor(fields: ResourceFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.location = fields.location
    this.mineItem = fields.mineItem
    this.locationType = fields.locationType
    this.systemRichness = fields.systemRichness
    this.amountMined = fields.amountMined
    this.numMiners = fields.numMiners
    this.mineItemUpdateId = fields.mineItemUpdateId
    this.resourceUpdateId = fields.resourceUpdateId
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Resource | null> {
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
  ): Promise<Array<Resource | null>> {
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

  static decode(data: Buffer): Resource {
    if (!data.slice(0, 8).equals(Resource.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Resource.layout.decode(data.slice(8))

    return new Resource({
      version: dec.version,
      gameId: dec.gameId,
      location: dec.location,
      mineItem: dec.mineItem,
      locationType: dec.locationType,
      systemRichness: dec.systemRichness,
      amountMined: dec.amountMined,
      numMiners: dec.numMiners,
      mineItemUpdateId: dec.mineItemUpdateId,
      resourceUpdateId: dec.resourceUpdateId,
      bump: dec.bump,
    })
  }

  toJSON(): ResourceJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      location: this.location.toString(),
      mineItem: this.mineItem.toString(),
      locationType: this.locationType,
      systemRichness: this.systemRichness,
      amountMined: this.amountMined.toString(),
      numMiners: this.numMiners.toString(),
      mineItemUpdateId: this.mineItemUpdateId.toString(),
      resourceUpdateId: this.resourceUpdateId.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: ResourceJSON): Resource {
    return new Resource({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      location: new PublicKey(obj.location),
      mineItem: new PublicKey(obj.mineItem),
      locationType: obj.locationType,
      systemRichness: obj.systemRichness,
      amountMined: new BN(obj.amountMined),
      numMiners: new BN(obj.numMiners),
      mineItemUpdateId: new BN(obj.mineItemUpdateId),
      resourceUpdateId: new BN(obj.resourceUpdateId),
      bump: obj.bump,
    })
  }
}
