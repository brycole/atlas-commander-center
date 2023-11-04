import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MovementStatsUnpackedFields {
  /** the amount of distance that the ship can cover in one second while sub-warping */
  subwarpSpeed: number
  /** the amount of distance that the ship can cover in one second while warping */
  warpSpeed: number
  /** the max distance that the ship can warp */
  maxWarpDistance: number
  /** the time it takes the ship to be able to warp again after a warp */
  warpCoolDown: number
  /** the amount of fuel consumed by the ship when sub-warp moving */
  subwarpFuelConsumptionRate: number
  /** the amount of fuel consumed by the ship when warp moving */
  warpFuelConsumptionRate: number
  /** the amount of fuel required to exit a planet */
  planetExitFuelAmount: number
}

export interface MovementStatsUnpackedJSON {
  /** the amount of distance that the ship can cover in one second while sub-warping */
  subwarpSpeed: number
  /** the amount of distance that the ship can cover in one second while warping */
  warpSpeed: number
  /** the max distance that the ship can warp */
  maxWarpDistance: number
  /** the time it takes the ship to be able to warp again after a warp */
  warpCoolDown: number
  /** the amount of fuel consumed by the ship when sub-warp moving */
  subwarpFuelConsumptionRate: number
  /** the amount of fuel consumed by the ship when warp moving */
  warpFuelConsumptionRate: number
  /** the amount of fuel required to exit a planet */
  planetExitFuelAmount: number
}

/** Unpacked version of [`MovementStats`] */
export class MovementStatsUnpacked {
  /** the amount of distance that the ship can cover in one second while sub-warping */
  readonly subwarpSpeed: number
  /** the amount of distance that the ship can cover in one second while warping */
  readonly warpSpeed: number
  /** the max distance that the ship can warp */
  readonly maxWarpDistance: number
  /** the time it takes the ship to be able to warp again after a warp */
  readonly warpCoolDown: number
  /** the amount of fuel consumed by the ship when sub-warp moving */
  readonly subwarpFuelConsumptionRate: number
  /** the amount of fuel consumed by the ship when warp moving */
  readonly warpFuelConsumptionRate: number
  /** the amount of fuel required to exit a planet */
  readonly planetExitFuelAmount: number

  constructor(fields: MovementStatsUnpackedFields) {
    this.subwarpSpeed = fields.subwarpSpeed
    this.warpSpeed = fields.warpSpeed
    this.maxWarpDistance = fields.maxWarpDistance
    this.warpCoolDown = fields.warpCoolDown
    this.subwarpFuelConsumptionRate = fields.subwarpFuelConsumptionRate
    this.warpFuelConsumptionRate = fields.warpFuelConsumptionRate
    this.planetExitFuelAmount = fields.planetExitFuelAmount
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("subwarpSpeed"),
        borsh.u32("warpSpeed"),
        borsh.u16("maxWarpDistance"),
        borsh.u16("warpCoolDown"),
        borsh.u32("subwarpFuelConsumptionRate"),
        borsh.u32("warpFuelConsumptionRate"),
        borsh.u32("planetExitFuelAmount"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MovementStatsUnpacked({
      subwarpSpeed: obj.subwarpSpeed,
      warpSpeed: obj.warpSpeed,
      maxWarpDistance: obj.maxWarpDistance,
      warpCoolDown: obj.warpCoolDown,
      subwarpFuelConsumptionRate: obj.subwarpFuelConsumptionRate,
      warpFuelConsumptionRate: obj.warpFuelConsumptionRate,
      planetExitFuelAmount: obj.planetExitFuelAmount,
    })
  }

  static toEncodable(fields: MovementStatsUnpackedFields) {
    return {
      subwarpSpeed: fields.subwarpSpeed,
      warpSpeed: fields.warpSpeed,
      maxWarpDistance: fields.maxWarpDistance,
      warpCoolDown: fields.warpCoolDown,
      subwarpFuelConsumptionRate: fields.subwarpFuelConsumptionRate,
      warpFuelConsumptionRate: fields.warpFuelConsumptionRate,
      planetExitFuelAmount: fields.planetExitFuelAmount,
    }
  }

  toJSON(): MovementStatsUnpackedJSON {
    return {
      subwarpSpeed: this.subwarpSpeed,
      warpSpeed: this.warpSpeed,
      maxWarpDistance: this.maxWarpDistance,
      warpCoolDown: this.warpCoolDown,
      subwarpFuelConsumptionRate: this.subwarpFuelConsumptionRate,
      warpFuelConsumptionRate: this.warpFuelConsumptionRate,
      planetExitFuelAmount: this.planetExitFuelAmount,
    }
  }

  static fromJSON(obj: MovementStatsUnpackedJSON): MovementStatsUnpacked {
    return new MovementStatsUnpacked({
      subwarpSpeed: obj.subwarpSpeed,
      warpSpeed: obj.warpSpeed,
      maxWarpDistance: obj.maxWarpDistance,
      warpCoolDown: obj.warpCoolDown,
      subwarpFuelConsumptionRate: obj.subwarpFuelConsumptionRate,
      warpFuelConsumptionRate: obj.warpFuelConsumptionRate,
      planetExitFuelAmount: obj.planetExitFuelAmount,
    })
  }

  toEncodable() {
    return MovementStatsUnpacked.toEncodable(this)
  }
}
