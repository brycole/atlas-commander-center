import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FleetInputFields {
  /** `Starbase` Level Info array */
  starbaseLevelInfoArray: Array<types.StarbaseLevelInfoArrayInputFields> | null
  /** Maximum `Fleet` size allowed */
  maxFleetSize: number | null
  /** The bump for the `FleetsLPModifier` account */
  fleetsLpModifierBump: number | null
  /** The bump for the `FleetsXPModifier` account */
  fleetsXpModifierBump: number | null
}

export interface FleetInputJSON {
  /** `Starbase` Level Info array */
  starbaseLevelInfoArray: Array<types.StarbaseLevelInfoArrayInputJSON> | null
  /** Maximum `Fleet` size allowed */
  maxFleetSize: number | null
  /** The bump for the `FleetsLPModifier` account */
  fleetsLpModifierBump: number | null
  /** The bump for the `FleetsXPModifier` account */
  fleetsXpModifierBump: number | null
}

/** Struct for data input to Update fleet settings */
export class FleetInput {
  /** `Starbase` Level Info array */
  readonly starbaseLevelInfoArray: Array<types.StarbaseLevelInfoArrayInput> | null
  /** Maximum `Fleet` size allowed */
  readonly maxFleetSize: number | null
  /** The bump for the `FleetsLPModifier` account */
  readonly fleetsLpModifierBump: number | null
  /** The bump for the `FleetsXPModifier` account */
  readonly fleetsXpModifierBump: number | null

  constructor(fields: FleetInputFields) {
    this.starbaseLevelInfoArray =
      (fields.starbaseLevelInfoArray &&
        fields.starbaseLevelInfoArray.map(
          (item) => new types.StarbaseLevelInfoArrayInput({ ...item })
        )) ||
      null
    this.maxFleetSize = fields.maxFleetSize
    this.fleetsLpModifierBump = fields.fleetsLpModifierBump
    this.fleetsXpModifierBump = fields.fleetsXpModifierBump
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(
          borsh.vec(types.StarbaseLevelInfoArrayInput.layout()),
          "starbaseLevelInfoArray"
        ),
        borsh.option(borsh.u32(), "maxFleetSize"),
        borsh.option(borsh.u8(), "fleetsLpModifierBump"),
        borsh.option(borsh.u8(), "fleetsXpModifierBump"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FleetInput({
      starbaseLevelInfoArray:
        (obj.starbaseLevelInfoArray &&
          obj.starbaseLevelInfoArray.map(
            (
              item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            ) => types.StarbaseLevelInfoArrayInput.fromDecoded(item)
          )) ||
        null,
      maxFleetSize: obj.maxFleetSize,
      fleetsLpModifierBump: obj.fleetsLpModifierBump,
      fleetsXpModifierBump: obj.fleetsXpModifierBump,
    })
  }

  static toEncodable(fields: FleetInputFields) {
    return {
      starbaseLevelInfoArray:
        (fields.starbaseLevelInfoArray &&
          fields.starbaseLevelInfoArray.map((item) =>
            types.StarbaseLevelInfoArrayInput.toEncodable(item)
          )) ||
        null,
      maxFleetSize: fields.maxFleetSize,
      fleetsLpModifierBump: fields.fleetsLpModifierBump,
      fleetsXpModifierBump: fields.fleetsXpModifierBump,
    }
  }

  toJSON(): FleetInputJSON {
    return {
      starbaseLevelInfoArray:
        (this.starbaseLevelInfoArray &&
          this.starbaseLevelInfoArray.map((item) => item.toJSON())) ||
        null,
      maxFleetSize: this.maxFleetSize,
      fleetsLpModifierBump: this.fleetsLpModifierBump,
      fleetsXpModifierBump: this.fleetsXpModifierBump,
    }
  }

  static fromJSON(obj: FleetInputJSON): FleetInput {
    return new FleetInput({
      starbaseLevelInfoArray:
        (obj.starbaseLevelInfoArray &&
          obj.starbaseLevelInfoArray.map((item) =>
            types.StarbaseLevelInfoArrayInput.fromJSON(item)
          )) ||
        null,
      maxFleetSize: obj.maxFleetSize,
      fleetsLpModifierBump: obj.fleetsLpModifierBump,
      fleetsXpModifierBump: obj.fleetsXpModifierBump,
    })
  }

  toEncodable() {
    return FleetInput.toEncodable(this)
  }
}
