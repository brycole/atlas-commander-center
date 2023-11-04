import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseLevelInfoArrayInputFields {
  /** The level of the `Starbase`. */
  level: number
  /** The `Starbase` faction. */
  faction: number
  /** The `Starbase` health points for this level. */
  hp: BN
  /** The `Starbase` shield points for this level. */
  sp: BN
  /** The planet position `Ring` available for this level */
  sectorRingAvailable: types.SectorRingKind
  /** Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS */
  warpLaneMovementFee: BN
}

export interface StarbaseLevelInfoArrayInputJSON {
  /** The level of the `Starbase`. */
  level: number
  /** The `Starbase` faction. */
  faction: number
  /** The `Starbase` health points for this level. */
  hp: string
  /** The `Starbase` shield points for this level. */
  sp: string
  /** The planet position `Ring` available for this level */
  sectorRingAvailable: types.SectorRingJSON
  /** Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS */
  warpLaneMovementFee: string
}

/** Struct for data input to Update Starbase Level Settings */
export class StarbaseLevelInfoArrayInput {
  /** The level of the `Starbase`. */
  readonly level: number
  /** The `Starbase` faction. */
  readonly faction: number
  /** The `Starbase` health points for this level. */
  readonly hp: BN
  /** The `Starbase` shield points for this level. */
  readonly sp: BN
  /** The planet position `Ring` available for this level */
  readonly sectorRingAvailable: types.SectorRingKind
  /** Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS */
  readonly warpLaneMovementFee: BN

  constructor(fields: StarbaseLevelInfoArrayInputFields) {
    this.level = fields.level
    this.faction = fields.faction
    this.hp = fields.hp
    this.sp = fields.sp
    this.sectorRingAvailable = fields.sectorRingAvailable
    this.warpLaneMovementFee = fields.warpLaneMovementFee
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("level"),
        borsh.u8("faction"),
        borsh.u64("hp"),
        borsh.u64("sp"),
        types.SectorRing.layout("sectorRingAvailable"),
        borsh.u64("warpLaneMovementFee"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseLevelInfoArrayInput({
      level: obj.level,
      faction: obj.faction,
      hp: obj.hp,
      sp: obj.sp,
      sectorRingAvailable: types.SectorRing.fromDecoded(
        obj.sectorRingAvailable
      ),
      warpLaneMovementFee: obj.warpLaneMovementFee,
    })
  }

  static toEncodable(fields: StarbaseLevelInfoArrayInputFields) {
    return {
      level: fields.level,
      faction: fields.faction,
      hp: fields.hp,
      sp: fields.sp,
      sectorRingAvailable: fields.sectorRingAvailable.toEncodable(),
      warpLaneMovementFee: fields.warpLaneMovementFee,
    }
  }

  toJSON(): StarbaseLevelInfoArrayInputJSON {
    return {
      level: this.level,
      faction: this.faction,
      hp: this.hp.toString(),
      sp: this.sp.toString(),
      sectorRingAvailable: this.sectorRingAvailable.toJSON(),
      warpLaneMovementFee: this.warpLaneMovementFee.toString(),
    }
  }

  static fromJSON(
    obj: StarbaseLevelInfoArrayInputJSON
  ): StarbaseLevelInfoArrayInput {
    return new StarbaseLevelInfoArrayInput({
      level: obj.level,
      faction: obj.faction,
      hp: new BN(obj.hp),
      sp: new BN(obj.sp),
      sectorRingAvailable: types.SectorRing.fromJSON(obj.sectorRingAvailable),
      warpLaneMovementFee: new BN(obj.warpLaneMovementFee),
    })
  }

  toEncodable() {
    return StarbaseLevelInfoArrayInput.toEncodable(this)
  }
}
