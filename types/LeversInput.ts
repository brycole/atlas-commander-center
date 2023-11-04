import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LeversInputFields {
  /** global lever that scales the quantity of resources. */
  l0ResourcesScalarMultiplication: BN | null
  /** global lever which impacts the distribution of effective emissions. */
  l1EmissionsMainBreaker: BN | null
  /** global lever which impacts the effect that system richness has on resource emissions. */
  l2SystemRichnessEmissions: BN | null
  /** global lever which impacts the effect that ship size has on resource emissions. */
  l3ShipSizeWeight: BN | null
  /** global lever which impacts the effect that resource hardness has on resource emissions. */
  l4ResourceHardness: BN | null
  /** Module wide lever that directly impacts the nominal cost of warping */
  l5FuelWarpBreaker: BN | null
  /** Module wide lever that directly impacts the nominal cost of planet exit */
  l6FuelPlanetBreaker: BN | null
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel) */
  l7FuelRefinementEfficiency: BN | null
  /** Module wide lever that directly impacts the nominal cost of mining.  (Value between 0 and 1) */
  l8MiningFoodBreaker: BN | null
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food) */
  l10FoodRefinementEfficiency: BN | null
  /** Module specific lever that scales the quantity of organics in the economy. */
  l11OrganicsScalarMultiplication: BN | null
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  l16FuelCombatBreaker: BN | null
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  l21FuelSubwarpBreaker: BN | null
}

export interface LeversInputJSON {
  /** global lever that scales the quantity of resources. */
  l0ResourcesScalarMultiplication: string | null
  /** global lever which impacts the distribution of effective emissions. */
  l1EmissionsMainBreaker: string | null
  /** global lever which impacts the effect that system richness has on resource emissions. */
  l2SystemRichnessEmissions: string | null
  /** global lever which impacts the effect that ship size has on resource emissions. */
  l3ShipSizeWeight: string | null
  /** global lever which impacts the effect that resource hardness has on resource emissions. */
  l4ResourceHardness: string | null
  /** Module wide lever that directly impacts the nominal cost of warping */
  l5FuelWarpBreaker: string | null
  /** Module wide lever that directly impacts the nominal cost of planet exit */
  l6FuelPlanetBreaker: string | null
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel) */
  l7FuelRefinementEfficiency: string | null
  /** Module wide lever that directly impacts the nominal cost of mining.  (Value between 0 and 1) */
  l8MiningFoodBreaker: string | null
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food) */
  l10FoodRefinementEfficiency: string | null
  /** Module specific lever that scales the quantity of organics in the economy. */
  l11OrganicsScalarMultiplication: string | null
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  l16FuelCombatBreaker: string | null
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  l21FuelSubwarpBreaker: string | null
}

/** Struct for data input to Update levers */
export class LeversInput {
  /** global lever that scales the quantity of resources. */
  readonly l0ResourcesScalarMultiplication: BN | null
  /** global lever which impacts the distribution of effective emissions. */
  readonly l1EmissionsMainBreaker: BN | null
  /** global lever which impacts the effect that system richness has on resource emissions. */
  readonly l2SystemRichnessEmissions: BN | null
  /** global lever which impacts the effect that ship size has on resource emissions. */
  readonly l3ShipSizeWeight: BN | null
  /** global lever which impacts the effect that resource hardness has on resource emissions. */
  readonly l4ResourceHardness: BN | null
  /** Module wide lever that directly impacts the nominal cost of warping */
  readonly l5FuelWarpBreaker: BN | null
  /** Module wide lever that directly impacts the nominal cost of planet exit */
  readonly l6FuelPlanetBreaker: BN | null
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel) */
  readonly l7FuelRefinementEfficiency: BN | null
  /** Module wide lever that directly impacts the nominal cost of mining.  (Value between 0 and 1) */
  readonly l8MiningFoodBreaker: BN | null
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food) */
  readonly l10FoodRefinementEfficiency: BN | null
  /** Module specific lever that scales the quantity of organics in the economy. */
  readonly l11OrganicsScalarMultiplication: BN | null
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  readonly l16FuelCombatBreaker: BN | null
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  readonly l21FuelSubwarpBreaker: BN | null

  constructor(fields: LeversInputFields) {
    this.l0ResourcesScalarMultiplication =
      fields.l0ResourcesScalarMultiplication
    this.l1EmissionsMainBreaker = fields.l1EmissionsMainBreaker
    this.l2SystemRichnessEmissions = fields.l2SystemRichnessEmissions
    this.l3ShipSizeWeight = fields.l3ShipSizeWeight
    this.l4ResourceHardness = fields.l4ResourceHardness
    this.l5FuelWarpBreaker = fields.l5FuelWarpBreaker
    this.l6FuelPlanetBreaker = fields.l6FuelPlanetBreaker
    this.l7FuelRefinementEfficiency = fields.l7FuelRefinementEfficiency
    this.l8MiningFoodBreaker = fields.l8MiningFoodBreaker
    this.l10FoodRefinementEfficiency = fields.l10FoodRefinementEfficiency
    this.l11OrganicsScalarMultiplication =
      fields.l11OrganicsScalarMultiplication
    this.l16FuelCombatBreaker = fields.l16FuelCombatBreaker
    this.l21FuelSubwarpBreaker = fields.l21FuelSubwarpBreaker
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.u64(), "l0ResourcesScalarMultiplication"),
        borsh.option(borsh.u64(), "l1EmissionsMainBreaker"),
        borsh.option(borsh.u64(), "l2SystemRichnessEmissions"),
        borsh.option(borsh.u64(), "l3ShipSizeWeight"),
        borsh.option(borsh.u64(), "l4ResourceHardness"),
        borsh.option(borsh.u64(), "l5FuelWarpBreaker"),
        borsh.option(borsh.u64(), "l6FuelPlanetBreaker"),
        borsh.option(borsh.u64(), "l7FuelRefinementEfficiency"),
        borsh.option(borsh.u64(), "l8MiningFoodBreaker"),
        borsh.option(borsh.u64(), "l10FoodRefinementEfficiency"),
        borsh.option(borsh.u64(), "l11OrganicsScalarMultiplication"),
        borsh.option(borsh.u64(), "l16FuelCombatBreaker"),
        borsh.option(borsh.u64(), "l21FuelSubwarpBreaker"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LeversInput({
      l0ResourcesScalarMultiplication: obj.l0ResourcesScalarMultiplication,
      l1EmissionsMainBreaker: obj.l1EmissionsMainBreaker,
      l2SystemRichnessEmissions: obj.l2SystemRichnessEmissions,
      l3ShipSizeWeight: obj.l3ShipSizeWeight,
      l4ResourceHardness: obj.l4ResourceHardness,
      l5FuelWarpBreaker: obj.l5FuelWarpBreaker,
      l6FuelPlanetBreaker: obj.l6FuelPlanetBreaker,
      l7FuelRefinementEfficiency: obj.l7FuelRefinementEfficiency,
      l8MiningFoodBreaker: obj.l8MiningFoodBreaker,
      l10FoodRefinementEfficiency: obj.l10FoodRefinementEfficiency,
      l11OrganicsScalarMultiplication: obj.l11OrganicsScalarMultiplication,
      l16FuelCombatBreaker: obj.l16FuelCombatBreaker,
      l21FuelSubwarpBreaker: obj.l21FuelSubwarpBreaker,
    })
  }

  static toEncodable(fields: LeversInputFields) {
    return {
      l0ResourcesScalarMultiplication: fields.l0ResourcesScalarMultiplication,
      l1EmissionsMainBreaker: fields.l1EmissionsMainBreaker,
      l2SystemRichnessEmissions: fields.l2SystemRichnessEmissions,
      l3ShipSizeWeight: fields.l3ShipSizeWeight,
      l4ResourceHardness: fields.l4ResourceHardness,
      l5FuelWarpBreaker: fields.l5FuelWarpBreaker,
      l6FuelPlanetBreaker: fields.l6FuelPlanetBreaker,
      l7FuelRefinementEfficiency: fields.l7FuelRefinementEfficiency,
      l8MiningFoodBreaker: fields.l8MiningFoodBreaker,
      l10FoodRefinementEfficiency: fields.l10FoodRefinementEfficiency,
      l11OrganicsScalarMultiplication: fields.l11OrganicsScalarMultiplication,
      l16FuelCombatBreaker: fields.l16FuelCombatBreaker,
      l21FuelSubwarpBreaker: fields.l21FuelSubwarpBreaker,
    }
  }

  toJSON(): LeversInputJSON {
    return {
      l0ResourcesScalarMultiplication:
        (this.l0ResourcesScalarMultiplication &&
          this.l0ResourcesScalarMultiplication.toString()) ||
        null,
      l1EmissionsMainBreaker:
        (this.l1EmissionsMainBreaker &&
          this.l1EmissionsMainBreaker.toString()) ||
        null,
      l2SystemRichnessEmissions:
        (this.l2SystemRichnessEmissions &&
          this.l2SystemRichnessEmissions.toString()) ||
        null,
      l3ShipSizeWeight:
        (this.l3ShipSizeWeight && this.l3ShipSizeWeight.toString()) || null,
      l4ResourceHardness:
        (this.l4ResourceHardness && this.l4ResourceHardness.toString()) || null,
      l5FuelWarpBreaker:
        (this.l5FuelWarpBreaker && this.l5FuelWarpBreaker.toString()) || null,
      l6FuelPlanetBreaker:
        (this.l6FuelPlanetBreaker && this.l6FuelPlanetBreaker.toString()) ||
        null,
      l7FuelRefinementEfficiency:
        (this.l7FuelRefinementEfficiency &&
          this.l7FuelRefinementEfficiency.toString()) ||
        null,
      l8MiningFoodBreaker:
        (this.l8MiningFoodBreaker && this.l8MiningFoodBreaker.toString()) ||
        null,
      l10FoodRefinementEfficiency:
        (this.l10FoodRefinementEfficiency &&
          this.l10FoodRefinementEfficiency.toString()) ||
        null,
      l11OrganicsScalarMultiplication:
        (this.l11OrganicsScalarMultiplication &&
          this.l11OrganicsScalarMultiplication.toString()) ||
        null,
      l16FuelCombatBreaker:
        (this.l16FuelCombatBreaker && this.l16FuelCombatBreaker.toString()) ||
        null,
      l21FuelSubwarpBreaker:
        (this.l21FuelSubwarpBreaker && this.l21FuelSubwarpBreaker.toString()) ||
        null,
    }
  }

  static fromJSON(obj: LeversInputJSON): LeversInput {
    return new LeversInput({
      l0ResourcesScalarMultiplication:
        (obj.l0ResourcesScalarMultiplication &&
          new BN(obj.l0ResourcesScalarMultiplication)) ||
        null,
      l1EmissionsMainBreaker:
        (obj.l1EmissionsMainBreaker && new BN(obj.l1EmissionsMainBreaker)) ||
        null,
      l2SystemRichnessEmissions:
        (obj.l2SystemRichnessEmissions &&
          new BN(obj.l2SystemRichnessEmissions)) ||
        null,
      l3ShipSizeWeight:
        (obj.l3ShipSizeWeight && new BN(obj.l3ShipSizeWeight)) || null,
      l4ResourceHardness:
        (obj.l4ResourceHardness && new BN(obj.l4ResourceHardness)) || null,
      l5FuelWarpBreaker:
        (obj.l5FuelWarpBreaker && new BN(obj.l5FuelWarpBreaker)) || null,
      l6FuelPlanetBreaker:
        (obj.l6FuelPlanetBreaker && new BN(obj.l6FuelPlanetBreaker)) || null,
      l7FuelRefinementEfficiency:
        (obj.l7FuelRefinementEfficiency &&
          new BN(obj.l7FuelRefinementEfficiency)) ||
        null,
      l8MiningFoodBreaker:
        (obj.l8MiningFoodBreaker && new BN(obj.l8MiningFoodBreaker)) || null,
      l10FoodRefinementEfficiency:
        (obj.l10FoodRefinementEfficiency &&
          new BN(obj.l10FoodRefinementEfficiency)) ||
        null,
      l11OrganicsScalarMultiplication:
        (obj.l11OrganicsScalarMultiplication &&
          new BN(obj.l11OrganicsScalarMultiplication)) ||
        null,
      l16FuelCombatBreaker:
        (obj.l16FuelCombatBreaker && new BN(obj.l16FuelCombatBreaker)) || null,
      l21FuelSubwarpBreaker:
        (obj.l21FuelSubwarpBreaker && new BN(obj.l21FuelSubwarpBreaker)) ||
        null,
    })
  }

  toEncodable() {
    return LeversInput.toEncodable(this)
  }
}
