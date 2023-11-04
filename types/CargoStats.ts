import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CargoStatsFields {
  /** the capacity of the ship's cargo hold */
  cargoCapacity: number
  /** the capacity of the ship's fuel tank */
  fuelCapacity: number
  /** the capacity of the ship's ammo bank */
  ammoCapacity: number
  /** the amount of ammo consumed per second by the ship when doing non-combat activities e.g. mining */
  ammoConsumptionRate: number
  /** the amount of food consumed per second by the ship when doing non-combat activities e.g. mining */
  foodConsumptionRate: number
  /** the amount of resources that can be mined by a ship per second */
  miningRate: number
  /** the amount of upgrade material that is consumed by a ship per second while upgrading a Starbase */
  upgradeRate: number
}

export interface CargoStatsJSON {
  /** the capacity of the ship's cargo hold */
  cargoCapacity: number
  /** the capacity of the ship's fuel tank */
  fuelCapacity: number
  /** the capacity of the ship's ammo bank */
  ammoCapacity: number
  /** the amount of ammo consumed per second by the ship when doing non-combat activities e.g. mining */
  ammoConsumptionRate: number
  /** the amount of food consumed per second by the ship when doing non-combat activities e.g. mining */
  foodConsumptionRate: number
  /** the amount of resources that can be mined by a ship per second */
  miningRate: number
  /** the amount of upgrade material that is consumed by a ship per second while upgrading a Starbase */
  upgradeRate: number
}

/** A ship's cargo stats */
export class CargoStats {
  /** the capacity of the ship's cargo hold */
  readonly cargoCapacity: number
  /** the capacity of the ship's fuel tank */
  readonly fuelCapacity: number
  /** the capacity of the ship's ammo bank */
  readonly ammoCapacity: number
  /** the amount of ammo consumed per second by the ship when doing non-combat activities e.g. mining */
  readonly ammoConsumptionRate: number
  /** the amount of food consumed per second by the ship when doing non-combat activities e.g. mining */
  readonly foodConsumptionRate: number
  /** the amount of resources that can be mined by a ship per second */
  readonly miningRate: number
  /** the amount of upgrade material that is consumed by a ship per second while upgrading a Starbase */
  readonly upgradeRate: number

  constructor(fields: CargoStatsFields) {
    this.cargoCapacity = fields.cargoCapacity
    this.fuelCapacity = fields.fuelCapacity
    this.ammoCapacity = fields.ammoCapacity
    this.ammoConsumptionRate = fields.ammoConsumptionRate
    this.foodConsumptionRate = fields.foodConsumptionRate
    this.miningRate = fields.miningRate
    this.upgradeRate = fields.upgradeRate
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("cargoCapacity"),
        borsh.u32("fuelCapacity"),
        borsh.u32("ammoCapacity"),
        borsh.u32("ammoConsumptionRate"),
        borsh.u32("foodConsumptionRate"),
        borsh.u32("miningRate"),
        borsh.u32("upgradeRate"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CargoStats({
      cargoCapacity: obj.cargoCapacity,
      fuelCapacity: obj.fuelCapacity,
      ammoCapacity: obj.ammoCapacity,
      ammoConsumptionRate: obj.ammoConsumptionRate,
      foodConsumptionRate: obj.foodConsumptionRate,
      miningRate: obj.miningRate,
      upgradeRate: obj.upgradeRate,
    })
  }

  static toEncodable(fields: CargoStatsFields) {
    return {
      cargoCapacity: fields.cargoCapacity,
      fuelCapacity: fields.fuelCapacity,
      ammoCapacity: fields.ammoCapacity,
      ammoConsumptionRate: fields.ammoConsumptionRate,
      foodConsumptionRate: fields.foodConsumptionRate,
      miningRate: fields.miningRate,
      upgradeRate: fields.upgradeRate,
    }
  }

  toJSON(): CargoStatsJSON {
    return {
      cargoCapacity: this.cargoCapacity,
      fuelCapacity: this.fuelCapacity,
      ammoCapacity: this.ammoCapacity,
      ammoConsumptionRate: this.ammoConsumptionRate,
      foodConsumptionRate: this.foodConsumptionRate,
      miningRate: this.miningRate,
      upgradeRate: this.upgradeRate,
    }
  }

  static fromJSON(obj: CargoStatsJSON): CargoStats {
    return new CargoStats({
      cargoCapacity: obj.cargoCapacity,
      fuelCapacity: obj.fuelCapacity,
      ammoCapacity: obj.ammoCapacity,
      ammoConsumptionRate: obj.ammoConsumptionRate,
      foodConsumptionRate: obj.foodConsumptionRate,
      miningRate: obj.miningRate,
      upgradeRate: obj.upgradeRate,
    })
  }

  toEncodable() {
    return CargoStats.toEncodable(this)
  }
}
