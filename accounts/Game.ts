import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GameFields {
  /** The data version of this account. */
  version: number
  /** The sequence id for updates. */
  updateId: BN
  /** The [`Profile`](player_profile::state::Profile) that handles the sector program permissions */
  profile: PublicKey
  /** The associated `GameState` account. */
  gameState: PublicKey
  /** Points setting */
  points: types.PointsFields
  /** Cargo settings */
  cargo: types.CargoFields
  /** Crafting settings */
  crafting: types.CraftingFields
  /** mint related settings */
  mints: types.MintsFields
  /** vault related settings */
  vaults: types.VaultsFields
  /** Data for risk zones */
  riskZones: types.RiskZonesDataFields
}

export interface GameJSON {
  /** The data version of this account. */
  version: number
  /** The sequence id for updates. */
  updateId: string
  /** The [`Profile`](player_profile::state::Profile) that handles the sector program permissions */
  profile: string
  /** The associated `GameState` account. */
  gameState: string
  /** Points setting */
  points: types.PointsJSON
  /** Cargo settings */
  cargo: types.CargoJSON
  /** Crafting settings */
  crafting: types.CraftingJSON
  /** mint related settings */
  mints: types.MintsJSON
  /** vault related settings */
  vaults: types.VaultsJSON
  /** Data for risk zones */
  riskZones: types.RiskZonesDataJSON
}

/** Global Game Configuration variables */
export class Game {
  /** The data version of this account. */
  readonly version: number
  /** The sequence id for updates. */
  readonly updateId: BN
  /** The [`Profile`](player_profile::state::Profile) that handles the sector program permissions */
  readonly profile: PublicKey
  /** The associated `GameState` account. */
  readonly gameState: PublicKey
  /** Points setting */
  readonly points: types.Points
  /** Cargo settings */
  readonly cargo: types.Cargo
  /** Crafting settings */
  readonly crafting: types.Crafting
  /** mint related settings */
  readonly mints: types.Mints
  /** vault related settings */
  readonly vaults: types.Vaults
  /** Data for risk zones */
  readonly riskZones: types.RiskZonesData

  static readonly discriminator = Buffer.from([
    27, 90, 166, 125, 74, 100, 121, 18,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.u64("updateId"),
    borsh.publicKey("profile"),
    borsh.publicKey("gameState"),
    types.Points.layout("points"),
    types.Cargo.layout("cargo"),
    types.Crafting.layout("crafting"),
    types.Mints.layout("mints"),
    types.Vaults.layout("vaults"),
    types.RiskZonesData.layout("riskZones"),
  ])

  constructor(fields: GameFields) {
    this.version = fields.version
    this.updateId = fields.updateId
    this.profile = fields.profile
    this.gameState = fields.gameState
    this.points = new types.Points({ ...fields.points })
    this.cargo = new types.Cargo({ ...fields.cargo })
    this.crafting = new types.Crafting({ ...fields.crafting })
    this.mints = new types.Mints({ ...fields.mints })
    this.vaults = new types.Vaults({ ...fields.vaults })
    this.riskZones = new types.RiskZonesData({ ...fields.riskZones })
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Game | null> {
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
  ): Promise<Array<Game | null>> {
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

  static decode(data: Buffer): Game {
    if (!data.slice(0, 8).equals(Game.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Game.layout.decode(data.slice(8))

    return new Game({
      version: dec.version,
      updateId: dec.updateId,
      profile: dec.profile,
      gameState: dec.gameState,
      points: types.Points.fromDecoded(dec.points),
      cargo: types.Cargo.fromDecoded(dec.cargo),
      crafting: types.Crafting.fromDecoded(dec.crafting),
      mints: types.Mints.fromDecoded(dec.mints),
      vaults: types.Vaults.fromDecoded(dec.vaults),
      riskZones: types.RiskZonesData.fromDecoded(dec.riskZones),
    })
  }

  toJSON(): GameJSON {
    return {
      version: this.version,
      updateId: this.updateId.toString(),
      profile: this.profile.toString(),
      gameState: this.gameState.toString(),
      points: this.points.toJSON(),
      cargo: this.cargo.toJSON(),
      crafting: this.crafting.toJSON(),
      mints: this.mints.toJSON(),
      vaults: this.vaults.toJSON(),
      riskZones: this.riskZones.toJSON(),
    }
  }

  static fromJSON(obj: GameJSON): Game {
    return new Game({
      version: obj.version,
      updateId: new BN(obj.updateId),
      profile: new PublicKey(obj.profile),
      gameState: new PublicKey(obj.gameState),
      points: types.Points.fromJSON(obj.points),
      cargo: types.Cargo.fromJSON(obj.cargo),
      crafting: types.Crafting.fromJSON(obj.crafting),
      mints: types.Mints.fromJSON(obj.mints),
      vaults: types.Vaults.fromJSON(obj.vaults),
      riskZones: types.RiskZonesData.fromJSON(obj.riskZones),
    })
  }
}
