import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FleetInfoFields {
  /** `Starbase` levels discriminated by faction */
  starbaseLevels: types.FactionsStarbaseLevelInfoFields
  /** The fleets account registered as a modifier for LP in the Points program */
  fleetsLpModifier: types.FleetsPointModifierFields
  /** The fleets account registered as a modifier for XP in the Points program */
  fleetsXpModifier: types.FleetsPointModifierFields
  /** Maximum `Fleet` size allowed */
  maxFleetSize: number
}

export interface FleetInfoJSON {
  /** `Starbase` levels discriminated by faction */
  starbaseLevels: types.FactionsStarbaseLevelInfoJSON
  /** The fleets account registered as a modifier for LP in the Points program */
  fleetsLpModifier: types.FleetsPointModifierJSON
  /** The fleets account registered as a modifier for XP in the Points program */
  fleetsXpModifier: types.FleetsPointModifierJSON
  /** Maximum `Fleet` size allowed */
  maxFleetSize: number
}

/** Variables for the Fleet program */
export class FleetInfo {
  /** `Starbase` levels discriminated by faction */
  readonly starbaseLevels: types.FactionsStarbaseLevelInfo
  /** The fleets account registered as a modifier for LP in the Points program */
  readonly fleetsLpModifier: types.FleetsPointModifier
  /** The fleets account registered as a modifier for XP in the Points program */
  readonly fleetsXpModifier: types.FleetsPointModifier
  /** Maximum `Fleet` size allowed */
  readonly maxFleetSize: number

  constructor(fields: FleetInfoFields) {
    this.starbaseLevels = new types.FactionsStarbaseLevelInfo({
      ...fields.starbaseLevels,
    })
    this.fleetsLpModifier = new types.FleetsPointModifier({
      ...fields.fleetsLpModifier,
    })
    this.fleetsXpModifier = new types.FleetsPointModifier({
      ...fields.fleetsXpModifier,
    })
    this.maxFleetSize = fields.maxFleetSize
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.FactionsStarbaseLevelInfo.layout("starbaseLevels"),
        types.FleetsPointModifier.layout("fleetsLpModifier"),
        types.FleetsPointModifier.layout("fleetsXpModifier"),
        borsh.u32("maxFleetSize"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FleetInfo({
      starbaseLevels: types.FactionsStarbaseLevelInfo.fromDecoded(
        obj.starbaseLevels
      ),
      fleetsLpModifier: types.FleetsPointModifier.fromDecoded(
        obj.fleetsLpModifier
      ),
      fleetsXpModifier: types.FleetsPointModifier.fromDecoded(
        obj.fleetsXpModifier
      ),
      maxFleetSize: obj.maxFleetSize,
    })
  }

  static toEncodable(fields: FleetInfoFields) {
    return {
      starbaseLevels: types.FactionsStarbaseLevelInfo.toEncodable(
        fields.starbaseLevels
      ),
      fleetsLpModifier: types.FleetsPointModifier.toEncodable(
        fields.fleetsLpModifier
      ),
      fleetsXpModifier: types.FleetsPointModifier.toEncodable(
        fields.fleetsXpModifier
      ),
      maxFleetSize: fields.maxFleetSize,
    }
  }

  toJSON(): FleetInfoJSON {
    return {
      starbaseLevels: this.starbaseLevels.toJSON(),
      fleetsLpModifier: this.fleetsLpModifier.toJSON(),
      fleetsXpModifier: this.fleetsXpModifier.toJSON(),
      maxFleetSize: this.maxFleetSize,
    }
  }

  static fromJSON(obj: FleetInfoJSON): FleetInfo {
    return new FleetInfo({
      starbaseLevels: types.FactionsStarbaseLevelInfo.fromJSON(
        obj.starbaseLevels
      ),
      fleetsLpModifier: types.FleetsPointModifier.fromJSON(
        obj.fleetsLpModifier
      ),
      fleetsXpModifier: types.FleetsPointModifier.fromJSON(
        obj.fleetsXpModifier
      ),
      maxFleetSize: obj.maxFleetSize,
    })
  }

  toEncodable() {
    return FleetInfo.toEncodable(this)
  }
}
