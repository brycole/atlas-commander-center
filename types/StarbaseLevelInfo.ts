import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseLevelInfoFields {
  /** The crafting recipe required to upgrade a `Starbase` to this level */
  recipeForUpgrade: PublicKey
  /** The crafting recipe category enabled for crafting at a `Starbase` of this level. */
  recipeCategoryForLevel: PublicKey
  /** The `Starbase` health points for this level. */
  hp: BN
  /** The `Starbase` shield points for this level. */
  sp: BN
  /** The planet position `Ring` available for this level */
  sectorRingAvailable: number
  /**
   * Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  warpLaneMovementFee: BN
}

export interface StarbaseLevelInfoJSON {
  /** The crafting recipe required to upgrade a `Starbase` to this level */
  recipeForUpgrade: string
  /** The crafting recipe category enabled for crafting at a `Starbase` of this level. */
  recipeCategoryForLevel: string
  /** The `Starbase` health points for this level. */
  hp: string
  /** The `Starbase` shield points for this level. */
  sp: string
  /** The planet position `Ring` available for this level */
  sectorRingAvailable: number
  /**
   * Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  warpLaneMovementFee: string
}

/** Information associated with `Starbase` levels */
export class StarbaseLevelInfo {
  /** The crafting recipe required to upgrade a `Starbase` to this level */
  readonly recipeForUpgrade: PublicKey
  /** The crafting recipe category enabled for crafting at a `Starbase` of this level. */
  readonly recipeCategoryForLevel: PublicKey
  /** The `Starbase` health points for this level. */
  readonly hp: BN
  /** The `Starbase` shield points for this level. */
  readonly sp: BN
  /** The planet position `Ring` available for this level */
  readonly sectorRingAvailable: number
  /**
   * Fee charged for the "warp lane" movement type which is meant to be charged in ATLAS
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  readonly warpLaneMovementFee: BN

  constructor(fields: StarbaseLevelInfoFields) {
    this.recipeForUpgrade = fields.recipeForUpgrade
    this.recipeCategoryForLevel = fields.recipeCategoryForLevel
    this.hp = fields.hp
    this.sp = fields.sp
    this.sectorRingAvailable = fields.sectorRingAvailable
    this.warpLaneMovementFee = fields.warpLaneMovementFee
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recipeForUpgrade"),
        borsh.publicKey("recipeCategoryForLevel"),
        borsh.u64("hp"),
        borsh.u64("sp"),
        borsh.u8("sectorRingAvailable"),
        borsh.u64("warpLaneMovementFee"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseLevelInfo({
      recipeForUpgrade: obj.recipeForUpgrade,
      recipeCategoryForLevel: obj.recipeCategoryForLevel,
      hp: obj.hp,
      sp: obj.sp,
      sectorRingAvailable: obj.sectorRingAvailable,
      warpLaneMovementFee: obj.warpLaneMovementFee,
    })
  }

  static toEncodable(fields: StarbaseLevelInfoFields) {
    return {
      recipeForUpgrade: fields.recipeForUpgrade,
      recipeCategoryForLevel: fields.recipeCategoryForLevel,
      hp: fields.hp,
      sp: fields.sp,
      sectorRingAvailable: fields.sectorRingAvailable,
      warpLaneMovementFee: fields.warpLaneMovementFee,
    }
  }

  toJSON(): StarbaseLevelInfoJSON {
    return {
      recipeForUpgrade: this.recipeForUpgrade.toString(),
      recipeCategoryForLevel: this.recipeCategoryForLevel.toString(),
      hp: this.hp.toString(),
      sp: this.sp.toString(),
      sectorRingAvailable: this.sectorRingAvailable,
      warpLaneMovementFee: this.warpLaneMovementFee.toString(),
    }
  }

  static fromJSON(obj: StarbaseLevelInfoJSON): StarbaseLevelInfo {
    return new StarbaseLevelInfo({
      recipeForUpgrade: new PublicKey(obj.recipeForUpgrade),
      recipeCategoryForLevel: new PublicKey(obj.recipeCategoryForLevel),
      hp: new BN(obj.hp),
      sp: new BN(obj.sp),
      sectorRingAvailable: obj.sectorRingAvailable,
      warpLaneMovementFee: new BN(obj.warpLaneMovementFee),
    })
  }

  toEncodable() {
    return StarbaseLevelInfo.toEncodable(this)
  }
}
