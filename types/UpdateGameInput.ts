import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateGameInputFields {
  /** Cargo settings */
  cargo: number
  /** Crafting settings */
  crafting: number
  /** Mints */
  mints: number
  /** Vaults */
  vaults: number
  /** Points settings */
  points: number
  /** Data for risk zones */
  riskZones: types.RiskZonesDataUnpackedFields | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateGameInputJSON {
  /** Cargo settings */
  cargo: number
  /** Crafting settings */
  crafting: number
  /** Mints */
  mints: number
  /** Vaults */
  vaults: number
  /** Points settings */
  points: number
  /** Data for risk zones */
  riskZones: types.RiskZonesDataUnpackedJSON | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update instruction */
export class UpdateGameInput {
  /** Cargo settings */
  readonly cargo: number
  /** Crafting settings */
  readonly crafting: number
  /** Mints */
  readonly mints: number
  /** Vaults */
  readonly vaults: number
  /** Points settings */
  readonly points: number
  /** Data for risk zones */
  readonly riskZones: types.RiskZonesDataUnpacked | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateGameInputFields) {
    this.cargo = fields.cargo
    this.crafting = fields.crafting
    this.mints = fields.mints
    this.vaults = fields.vaults
    this.points = fields.points
    this.riskZones =
      (fields.riskZones &&
        new types.RiskZonesDataUnpacked({ ...fields.riskZones })) ||
      null
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("cargo"),
        borsh.u8("crafting"),
        borsh.u8("mints"),
        borsh.u8("vaults"),
        borsh.u8("points"),
        borsh.option(types.RiskZonesDataUnpacked.layout(), "riskZones"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateGameInput({
      cargo: obj.cargo,
      crafting: obj.crafting,
      mints: obj.mints,
      vaults: obj.vaults,
      points: obj.points,
      riskZones:
        (obj.riskZones &&
          types.RiskZonesDataUnpacked.fromDecoded(obj.riskZones)) ||
        null,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateGameInputFields) {
    return {
      cargo: fields.cargo,
      crafting: fields.crafting,
      mints: fields.mints,
      vaults: fields.vaults,
      points: fields.points,
      riskZones:
        (fields.riskZones &&
          types.RiskZonesDataUnpacked.toEncodable(fields.riskZones)) ||
        null,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateGameInputJSON {
    return {
      cargo: this.cargo,
      crafting: this.crafting,
      mints: this.mints,
      vaults: this.vaults,
      points: this.points,
      riskZones: (this.riskZones && this.riskZones.toJSON()) || null,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateGameInputJSON): UpdateGameInput {
    return new UpdateGameInput({
      cargo: obj.cargo,
      crafting: obj.crafting,
      mints: obj.mints,
      vaults: obj.vaults,
      points: obj.points,
      riskZones:
        (obj.riskZones &&
          types.RiskZonesDataUnpacked.fromJSON(obj.riskZones)) ||
        null,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateGameInput.toEncodable(this)
  }
}
