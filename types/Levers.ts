import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LeversFields {
  /** global lever that scales the quantity of resources. Units are 10000ths. Valid output values > 0. */
  l0ResourcesScalarMultiplication: BN
  /** global lever which impacts the distribution of effective emissions. Units are 10000ths. Valid output values >= 0. */
  l1EmissionsMainBreaker: BN
  /** global lever which impacts the effect that system richness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l2SystemRichnessEmissions: BN
  /** global lever which impacts the effect that ship size has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l3ShipSizeWeight: BN
  /** global lever which impacts the effect that resource hardness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l4ResourceHardness: BN
  /** Module wide lever that directly impacts the nominal cost of warping. Units are 10000ths. Valid output values > 1. */
  l5FuelWarpBreaker: BN
  /** Module wide lever that directly impacts the nominal cost of planet exit. Units are 10000ths. Valid output values > 1. */
  l6FuelPlanetBreaker: BN
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel). Units are 10000ths. Valid output values > 1. */
  l7FuelRefinementEfficiency: BN
  /** Module wide lever that directly impacts the nominal cost of mining. Units are 10000ths. Valid output values between 0 and 1. */
  l8MiningFoodBreaker: BN
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food). Units are 10000ths. Valid output values > 0. */
  l10FoodRefinementEfficiency: BN
  /** Module specific lever that scales the quantity of organics in the economy. */
  l11OrganicsScalarMultiplication: BN
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  l16FuelCombatBreaker: BN
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  l21FuelSubwarpBreaker: BN
  /**
   * Set of derived sub-levers used in `calculate_base_emissions()`.
   * Math formula: `l1_emissions_main_breaker.powf(l3_ship_size_weight * ship_size)`
   */
  baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtilFields
}

export interface LeversJSON {
  /** global lever that scales the quantity of resources. Units are 10000ths. Valid output values > 0. */
  l0ResourcesScalarMultiplication: string
  /** global lever which impacts the distribution of effective emissions. Units are 10000ths. Valid output values >= 0. */
  l1EmissionsMainBreaker: string
  /** global lever which impacts the effect that system richness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l2SystemRichnessEmissions: string
  /** global lever which impacts the effect that ship size has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l3ShipSizeWeight: string
  /** global lever which impacts the effect that resource hardness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  l4ResourceHardness: string
  /** Module wide lever that directly impacts the nominal cost of warping. Units are 10000ths. Valid output values > 1. */
  l5FuelWarpBreaker: string
  /** Module wide lever that directly impacts the nominal cost of planet exit. Units are 10000ths. Valid output values > 1. */
  l6FuelPlanetBreaker: string
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel). Units are 10000ths. Valid output values > 1. */
  l7FuelRefinementEfficiency: string
  /** Module wide lever that directly impacts the nominal cost of mining. Units are 10000ths. Valid output values between 0 and 1. */
  l8MiningFoodBreaker: string
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food). Units are 10000ths. Valid output values > 0. */
  l10FoodRefinementEfficiency: string
  /** Module specific lever that scales the quantity of organics in the economy. */
  l11OrganicsScalarMultiplication: string
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  l16FuelCombatBreaker: string
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  l21FuelSubwarpBreaker: string
  /**
   * Set of derived sub-levers used in `calculate_base_emissions()`.
   * Math formula: `l1_emissions_main_breaker.powf(l3_ship_size_weight * ship_size)`
   */
  baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtilJSON
}

/** Global levers */
export class Levers {
  /** global lever that scales the quantity of resources. Units are 10000ths. Valid output values > 0. */
  readonly l0ResourcesScalarMultiplication: BN
  /** global lever which impacts the distribution of effective emissions. Units are 10000ths. Valid output values >= 0. */
  readonly l1EmissionsMainBreaker: BN
  /** global lever which impacts the effect that system richness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  readonly l2SystemRichnessEmissions: BN
  /** global lever which impacts the effect that ship size has on resource emissions. Units are 10000ths. Valid output values > 0. */
  readonly l3ShipSizeWeight: BN
  /** global lever which impacts the effect that resource hardness has on resource emissions. Units are 10000ths. Valid output values > 0. */
  readonly l4ResourceHardness: BN
  /** Module wide lever that directly impacts the nominal cost of warping. Units are 10000ths. Valid output values > 1. */
  readonly l5FuelWarpBreaker: BN
  /** Module wide lever that directly impacts the nominal cost of planet exit. Units are 10000ths. Valid output values > 1. */
  readonly l6FuelPlanetBreaker: BN
  /** Module wide lever that impacts refinement from R20 (hydrogen) to R4 (fuel). Units are 10000ths. Valid output values > 1. */
  readonly l7FuelRefinementEfficiency: BN
  /** Module wide lever that directly impacts the nominal cost of mining. Units are 10000ths. Valid output values between 0 and 1. */
  readonly l8MiningFoodBreaker: BN
  /** Module wide lever that impacts refinement from R20 (organics) to R4 (food). Units are 10000ths. Valid output values > 0. */
  readonly l10FoodRefinementEfficiency: BN
  /** Module specific lever that scales the quantity of organics in the economy. */
  readonly l11OrganicsScalarMultiplication: BN
  /** Module wide lever that directly impacts the nominal cost of combat. Units are 10000ths. Valid output values > 0. */
  readonly l16FuelCombatBreaker: BN
  /** Module wide lever that directly impacts the nominal cost of subwarp mvmt. Units are 10000ths. Valid output values > 0. */
  readonly l21FuelSubwarpBreaker: BN
  /**
   * Set of derived sub-levers used in `calculate_base_emissions()`.
   * Math formula: `l1_emissions_main_breaker.powf(l3_ship_size_weight * ship_size)`
   */
  readonly baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtil

  constructor(fields: LeversFields) {
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
    this.baseEmissionsBySizeUtil = new types.BaseEmissionsBySizeUtil({
      ...fields.baseEmissionsBySizeUtil,
    })
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("l0ResourcesScalarMultiplication"),
        borsh.u64("l1EmissionsMainBreaker"),
        borsh.u64("l2SystemRichnessEmissions"),
        borsh.u64("l3ShipSizeWeight"),
        borsh.u64("l4ResourceHardness"),
        borsh.u64("l5FuelWarpBreaker"),
        borsh.u64("l6FuelPlanetBreaker"),
        borsh.u64("l7FuelRefinementEfficiency"),
        borsh.u64("l8MiningFoodBreaker"),
        borsh.u64("l10FoodRefinementEfficiency"),
        borsh.u64("l11OrganicsScalarMultiplication"),
        borsh.u64("l16FuelCombatBreaker"),
        borsh.u64("l21FuelSubwarpBreaker"),
        types.BaseEmissionsBySizeUtil.layout("baseEmissionsBySizeUtil"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Levers({
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
      baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtil.fromDecoded(
        obj.baseEmissionsBySizeUtil
      ),
    })
  }

  static toEncodable(fields: LeversFields) {
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
      baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtil.toEncodable(
        fields.baseEmissionsBySizeUtil
      ),
    }
  }

  toJSON(): LeversJSON {
    return {
      l0ResourcesScalarMultiplication:
        this.l0ResourcesScalarMultiplication.toString(),
      l1EmissionsMainBreaker: this.l1EmissionsMainBreaker.toString(),
      l2SystemRichnessEmissions: this.l2SystemRichnessEmissions.toString(),
      l3ShipSizeWeight: this.l3ShipSizeWeight.toString(),
      l4ResourceHardness: this.l4ResourceHardness.toString(),
      l5FuelWarpBreaker: this.l5FuelWarpBreaker.toString(),
      l6FuelPlanetBreaker: this.l6FuelPlanetBreaker.toString(),
      l7FuelRefinementEfficiency: this.l7FuelRefinementEfficiency.toString(),
      l8MiningFoodBreaker: this.l8MiningFoodBreaker.toString(),
      l10FoodRefinementEfficiency: this.l10FoodRefinementEfficiency.toString(),
      l11OrganicsScalarMultiplication:
        this.l11OrganicsScalarMultiplication.toString(),
      l16FuelCombatBreaker: this.l16FuelCombatBreaker.toString(),
      l21FuelSubwarpBreaker: this.l21FuelSubwarpBreaker.toString(),
      baseEmissionsBySizeUtil: this.baseEmissionsBySizeUtil.toJSON(),
    }
  }

  static fromJSON(obj: LeversJSON): Levers {
    return new Levers({
      l0ResourcesScalarMultiplication: new BN(
        obj.l0ResourcesScalarMultiplication
      ),
      l1EmissionsMainBreaker: new BN(obj.l1EmissionsMainBreaker),
      l2SystemRichnessEmissions: new BN(obj.l2SystemRichnessEmissions),
      l3ShipSizeWeight: new BN(obj.l3ShipSizeWeight),
      l4ResourceHardness: new BN(obj.l4ResourceHardness),
      l5FuelWarpBreaker: new BN(obj.l5FuelWarpBreaker),
      l6FuelPlanetBreaker: new BN(obj.l6FuelPlanetBreaker),
      l7FuelRefinementEfficiency: new BN(obj.l7FuelRefinementEfficiency),
      l8MiningFoodBreaker: new BN(obj.l8MiningFoodBreaker),
      l10FoodRefinementEfficiency: new BN(obj.l10FoodRefinementEfficiency),
      l11OrganicsScalarMultiplication: new BN(
        obj.l11OrganicsScalarMultiplication
      ),
      l16FuelCombatBreaker: new BN(obj.l16FuelCombatBreaker),
      l21FuelSubwarpBreaker: new BN(obj.l21FuelSubwarpBreaker),
      baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtil.fromJSON(
        obj.baseEmissionsBySizeUtil
      ),
    })
  }

  toEncodable() {
    return Levers.toEncodable(this)
  }
}
