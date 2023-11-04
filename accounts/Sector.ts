import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SectorFields {
  /** The data version of this account. */
  version: number
  /** the game_id that this belongs to */
  gameId: PublicKey
  /** coordinates as [x, y] */
  coordinates: Array<BN>
  /** The discoverer of this sector */
  discoverer: PublicKey
  /** The name of this sector */
  name: Array<number>
  /** the number of stars in this system */
  numStars: number
  /** the number of planets in this system */
  numPlanets: number
  /** the number of moons in this system */
  numMoons: number
  /** the number of num_asteroid belts in this system */
  numAsteroidBelts: number
  /** the number of connections in this system */
  numConnections: number
  /** PDA bump */
  bump: number
}

export interface SectorJSON {
  /** The data version of this account. */
  version: number
  /** the game_id that this belongs to */
  gameId: string
  /** coordinates as [x, y] */
  coordinates: Array<string>
  /** The discoverer of this sector */
  discoverer: string
  /** The name of this sector */
  name: Array<number>
  /** the number of stars in this system */
  numStars: number
  /** the number of planets in this system */
  numPlanets: number
  /** the number of moons in this system */
  numMoons: number
  /** the number of num_asteroid belts in this system */
  numAsteroidBelts: number
  /** the number of connections in this system */
  numConnections: number
  /** PDA bump */
  bump: number
}

/** Sector */
export class Sector {
  /** The data version of this account. */
  readonly version: number
  /** the game_id that this belongs to */
  readonly gameId: PublicKey
  /** coordinates as [x, y] */
  readonly coordinates: Array<BN>
  /** The discoverer of this sector */
  readonly discoverer: PublicKey
  /** The name of this sector */
  readonly name: Array<number>
  /** the number of stars in this system */
  readonly numStars: number
  /** the number of planets in this system */
  readonly numPlanets: number
  /** the number of moons in this system */
  readonly numMoons: number
  /** the number of num_asteroid belts in this system */
  readonly numAsteroidBelts: number
  /** the number of connections in this system */
  readonly numConnections: number
  /** PDA bump */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    65, 117, 23, 82, 80, 133, 247, 233,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.array(borsh.i64(), 2, "coordinates"),
    borsh.publicKey("discoverer"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.u16("numStars"),
    borsh.u16("numPlanets"),
    borsh.u16("numMoons"),
    borsh.u16("numAsteroidBelts"),
    borsh.u16("numConnections"),
    borsh.u8("bump"),
  ])

  constructor(fields: SectorFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.coordinates = fields.coordinates
    this.discoverer = fields.discoverer
    this.name = fields.name
    this.numStars = fields.numStars
    this.numPlanets = fields.numPlanets
    this.numMoons = fields.numMoons
    this.numAsteroidBelts = fields.numAsteroidBelts
    this.numConnections = fields.numConnections
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Sector | null> {
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
  ): Promise<Array<Sector | null>> {
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

  static decode(data: Buffer): Sector {
    if (!data.slice(0, 8).equals(Sector.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Sector.layout.decode(data.slice(8))

    return new Sector({
      version: dec.version,
      gameId: dec.gameId,
      coordinates: dec.coordinates,
      discoverer: dec.discoverer,
      name: dec.name,
      numStars: dec.numStars,
      numPlanets: dec.numPlanets,
      numMoons: dec.numMoons,
      numAsteroidBelts: dec.numAsteroidBelts,
      numConnections: dec.numConnections,
      bump: dec.bump,
    })
  }

  toJSON(): SectorJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      coordinates: this.coordinates.map((item) => item.toString()),
      discoverer: this.discoverer.toString(),
      name: this.name,
      numStars: this.numStars,
      numPlanets: this.numPlanets,
      numMoons: this.numMoons,
      numAsteroidBelts: this.numAsteroidBelts,
      numConnections: this.numConnections,
      bump: this.bump,
    }
  }

  static fromJSON(obj: SectorJSON): Sector {
    return new Sector({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      coordinates: obj.coordinates.map((item) => new BN(item)),
      discoverer: new PublicKey(obj.discoverer),
      name: obj.name,
      numStars: obj.numStars,
      numPlanets: obj.numPlanets,
      numMoons: obj.numMoons,
      numAsteroidBelts: obj.numAsteroidBelts,
      numConnections: obj.numConnections,
      bump: obj.bump,
    })
  }
}
