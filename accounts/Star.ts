import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StarFields {
  /** The data version of this account. */
  version: number
  /** The name of this `Star` */
  name: Array<number>
  /** the game_id that this belongs to */
  gameId: PublicKey
  /** the sector that this belongs to */
  sector: Array<BN>
  /** size */
  size: BN
  /** sub_coordinates as [x, y] */
  subCoordinates: Array<BN>
  /** the star type */
  starType: number
}

export interface StarJSON {
  /** The data version of this account. */
  version: number
  /** The name of this `Star` */
  name: Array<number>
  /** the game_id that this belongs to */
  gameId: string
  /** the sector that this belongs to */
  sector: Array<string>
  /** size */
  size: string
  /** sub_coordinates as [x, y] */
  subCoordinates: Array<string>
  /** the star type */
  starType: number
}

/** `Star` account */
export class Star {
  /** The data version of this account. */
  readonly version: number
  /** The name of this `Star` */
  readonly name: Array<number>
  /** the game_id that this belongs to */
  readonly gameId: PublicKey
  /** the sector that this belongs to */
  readonly sector: Array<BN>
  /** size */
  readonly size: BN
  /** sub_coordinates as [x, y] */
  readonly subCoordinates: Array<BN>
  /** the star type */
  readonly starType: number

  static readonly discriminator = Buffer.from([
    214, 131, 207, 208, 202, 148, 162, 48,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.publicKey("gameId"),
    borsh.array(borsh.i64(), 2, "sector"),
    borsh.u64("size"),
    borsh.array(borsh.i64(), 2, "subCoordinates"),
    borsh.u8("starType"),
  ])

  constructor(fields: StarFields) {
    this.version = fields.version
    this.name = fields.name
    this.gameId = fields.gameId
    this.sector = fields.sector
    this.size = fields.size
    this.subCoordinates = fields.subCoordinates
    this.starType = fields.starType
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Star | null> {
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
  ): Promise<Array<Star | null>> {
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

  static decode(data: Buffer): Star {
    if (!data.slice(0, 8).equals(Star.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Star.layout.decode(data.slice(8))

    return new Star({
      version: dec.version,
      name: dec.name,
      gameId: dec.gameId,
      sector: dec.sector,
      size: dec.size,
      subCoordinates: dec.subCoordinates,
      starType: dec.starType,
    })
  }

  toJSON(): StarJSON {
    return {
      version: this.version,
      name: this.name,
      gameId: this.gameId.toString(),
      sector: this.sector.map((item) => item.toString()),
      size: this.size.toString(),
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      starType: this.starType,
    }
  }

  static fromJSON(obj: StarJSON): Star {
    return new Star({
      version: obj.version,
      name: obj.name,
      gameId: new PublicKey(obj.gameId),
      sector: obj.sector.map((item) => new BN(item)),
      size: new BN(obj.size),
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      starType: obj.starType,
    })
  }
}
