import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShipStatsFields {
  /** Movement stats for the ship */
  movementStats: types.MovementStatsFields
  /** Cargo stats for the ship */
  cargoStats: types.CargoStatsFields
  /** Miscellaneous stats for the ship */
  miscStats: types.MiscStatsFields
}

export interface ShipStatsJSON {
  /** Movement stats for the ship */
  movementStats: types.MovementStatsJSON
  /** Cargo stats for the ship */
  cargoStats: types.CargoStatsJSON
  /** Miscellaneous stats for the ship */
  miscStats: types.MiscStatsJSON
}

/** A ship's stats */
export class ShipStats {
  /** Movement stats for the ship */
  readonly movementStats: types.MovementStats
  /** Cargo stats for the ship */
  readonly cargoStats: types.CargoStats
  /** Miscellaneous stats for the ship */
  readonly miscStats: types.MiscStats

  constructor(fields: ShipStatsFields) {
    this.movementStats = new types.MovementStats({ ...fields.movementStats })
    this.cargoStats = new types.CargoStats({ ...fields.cargoStats })
    this.miscStats = new types.MiscStats({ ...fields.miscStats })
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.MovementStats.layout("movementStats"),
        types.CargoStats.layout("cargoStats"),
        types.MiscStats.layout("miscStats"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShipStats({
      movementStats: types.MovementStats.fromDecoded(obj.movementStats),
      cargoStats: types.CargoStats.fromDecoded(obj.cargoStats),
      miscStats: types.MiscStats.fromDecoded(obj.miscStats),
    })
  }

  static toEncodable(fields: ShipStatsFields) {
    return {
      movementStats: types.MovementStats.toEncodable(fields.movementStats),
      cargoStats: types.CargoStats.toEncodable(fields.cargoStats),
      miscStats: types.MiscStats.toEncodable(fields.miscStats),
    }
  }

  toJSON(): ShipStatsJSON {
    return {
      movementStats: this.movementStats.toJSON(),
      cargoStats: this.cargoStats.toJSON(),
      miscStats: this.miscStats.toJSON(),
    }
  }

  static fromJSON(obj: ShipStatsJSON): ShipStats {
    return new ShipStats({
      movementStats: types.MovementStats.fromJSON(obj.movementStats),
      cargoStats: types.CargoStats.fromJSON(obj.cargoStats),
      miscStats: types.MiscStats.fromJSON(obj.miscStats),
    })
  }

  toEncodable() {
    return ShipStats.toEncodable(this)
  }
}
