import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PlanetFields {
  /** The data version of this account. */
  version: number
  /** The name of this `Planet` */
  name: Array<number>
  /** the `Game` that this belongs to */
  gameId: PublicKey
  /** the sector that this belongs to */
  sector: Array<BN>
  /** sub_coordinates as [x, y] */
  subCoordinates: Array<BN>
  /** the planet type */
  planetType: number
  /** the planet position */
  position: number
  /** size */
  size: BN
  /** maximum health */
  maxHp: BN
  /** The current health of the `Planet`. */
  currentHealth: BN
  /** the cumulative amount mined from this `Asteroid` */
  amountMined: BN
  /** the number of resources at this `Asteroid` */
  numResources: number
  /** the number of entities currently mining at this `Asteroid` */
  numMiners: BN
}

export interface PlanetJSON {
  /** The data version of this account. */
  version: number
  /** The name of this `Planet` */
  name: Array<number>
  /** the `Game` that this belongs to */
  gameId: string
  /** the sector that this belongs to */
  sector: Array<string>
  /** sub_coordinates as [x, y] */
  subCoordinates: Array<string>
  /** the planet type */
  planetType: number
  /** the planet position */
  position: number
  /** size */
  size: string
  /** maximum health */
  maxHp: string
  /** The current health of the `Planet`. */
  currentHealth: string
  /** the cumulative amount mined from this `Asteroid` */
  amountMined: string
  /** the number of resources at this `Asteroid` */
  numResources: number
  /** the number of entities currently mining at this `Asteroid` */
  numMiners: string
}

/** Planet */
export class Planet {
  /** The data version of this account. */
  readonly version: number
  /** The name of this `Planet` */
  readonly name: Array<number>
  /** the `Game` that this belongs to */
  readonly gameId: PublicKey
  /** the sector that this belongs to */
  readonly sector: Array<BN>
  /** sub_coordinates as [x, y] */
  readonly subCoordinates: Array<BN>
  /** the planet type */
  readonly planetType: number
  /** the planet position */
  readonly position: number
  /** size */
  readonly size: BN
  /** maximum health */
  readonly maxHp: BN
  /** The current health of the `Planet`. */
  readonly currentHealth: BN
  /** the cumulative amount mined from this `Asteroid` */
  readonly amountMined: BN
  /** the number of resources at this `Asteroid` */
  readonly numResources: number
  /** the number of entities currently mining at this `Asteroid` */
  readonly numMiners: BN

  static readonly discriminator = Buffer.from([
    242, 27, 236, 42, 220, 217, 132, 128,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.publicKey("gameId"),
    borsh.array(borsh.i64(), 2, "sector"),
    borsh.array(borsh.i64(), 2, "subCoordinates"),
    borsh.u8("planetType"),
    borsh.u8("position"),
    borsh.u64("size"),
    borsh.u64("maxHp"),
    borsh.u64("currentHealth"),
    borsh.u64("amountMined"),
    borsh.u8("numResources"),
    borsh.u64("numMiners"),
  ])

  constructor(fields: PlanetFields) {
    this.version = fields.version
    this.name = fields.name
    this.gameId = fields.gameId
    this.sector = fields.sector
    this.subCoordinates = fields.subCoordinates
    this.planetType = fields.planetType
    this.position = fields.position
    this.size = fields.size
    this.maxHp = fields.maxHp
    this.currentHealth = fields.currentHealth
    this.amountMined = fields.amountMined
    this.numResources = fields.numResources
    this.numMiners = fields.numMiners
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Planet | null> {
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
  ): Promise<Array<Planet | null>> {
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

  static decode(data: Buffer): Planet {
    if (!data.slice(0, 8).equals(Planet.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Planet.layout.decode(data.slice(8))

    return new Planet({
      version: dec.version,
      name: dec.name,
      gameId: dec.gameId,
      sector: dec.sector,
      subCoordinates: dec.subCoordinates,
      planetType: dec.planetType,
      position: dec.position,
      size: dec.size,
      maxHp: dec.maxHp,
      currentHealth: dec.currentHealth,
      amountMined: dec.amountMined,
      numResources: dec.numResources,
      numMiners: dec.numMiners,
    })
  }

  toJSON(): PlanetJSON {
    return {
      version: this.version,
      name: this.name,
      gameId: this.gameId.toString(),
      sector: this.sector.map((item) => item.toString()),
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      planetType: this.planetType,
      position: this.position,
      size: this.size.toString(),
      maxHp: this.maxHp.toString(),
      currentHealth: this.currentHealth.toString(),
      amountMined: this.amountMined.toString(),
      numResources: this.numResources,
      numMiners: this.numMiners.toString(),
    }
  }

  static fromJSON(obj: PlanetJSON): Planet {
    return new Planet({
      version: obj.version,
      name: obj.name,
      gameId: new PublicKey(obj.gameId),
      sector: obj.sector.map((item) => new BN(item)),
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      planetType: obj.planetType,
      position: obj.position,
      size: new BN(obj.size),
      maxHp: new BN(obj.maxHp),
      currentHealth: new BN(obj.currentHealth),
      amountMined: new BN(obj.amountMined),
      numResources: obj.numResources,
      numMiners: new BN(obj.numMiners),
    })
  }
}
