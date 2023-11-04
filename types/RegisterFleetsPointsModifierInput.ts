import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterFleetsPointsModifierInputFields {
  /** The modifier can increment points */
  canIncrement: boolean
  /** The modifier can decrement points */
  canDecrement: boolean
  /** the index of the key in the player profile */
  keyIndex: number
  /** The points category of the modifier (XP/LP) */
  pointsCategory: number
}

export interface RegisterFleetsPointsModifierInputJSON {
  /** The modifier can increment points */
  canIncrement: boolean
  /** The modifier can decrement points */
  canDecrement: boolean
  /** the index of the key in the player profile */
  keyIndex: number
  /** The points category of the modifier (XP/LP) */
  pointsCategory: number
}

/** Struct for data input to register a points modifier for fleets program */
export class RegisterFleetsPointsModifierInput {
  /** The modifier can increment points */
  readonly canIncrement: boolean
  /** The modifier can decrement points */
  readonly canDecrement: boolean
  /** the index of the key in the player profile */
  readonly keyIndex: number
  /** The points category of the modifier (XP/LP) */
  readonly pointsCategory: number

  constructor(fields: RegisterFleetsPointsModifierInputFields) {
    this.canIncrement = fields.canIncrement
    this.canDecrement = fields.canDecrement
    this.keyIndex = fields.keyIndex
    this.pointsCategory = fields.pointsCategory
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.bool("canIncrement"),
        borsh.bool("canDecrement"),
        borsh.u16("keyIndex"),
        borsh.u8("pointsCategory"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterFleetsPointsModifierInput({
      canIncrement: obj.canIncrement,
      canDecrement: obj.canDecrement,
      keyIndex: obj.keyIndex,
      pointsCategory: obj.pointsCategory,
    })
  }

  static toEncodable(fields: RegisterFleetsPointsModifierInputFields) {
    return {
      canIncrement: fields.canIncrement,
      canDecrement: fields.canDecrement,
      keyIndex: fields.keyIndex,
      pointsCategory: fields.pointsCategory,
    }
  }

  toJSON(): RegisterFleetsPointsModifierInputJSON {
    return {
      canIncrement: this.canIncrement,
      canDecrement: this.canDecrement,
      keyIndex: this.keyIndex,
      pointsCategory: this.pointsCategory,
    }
  }

  static fromJSON(
    obj: RegisterFleetsPointsModifierInputJSON
  ): RegisterFleetsPointsModifierInput {
    return new RegisterFleetsPointsModifierInput({
      canIncrement: obj.canIncrement,
      canDecrement: obj.canDecrement,
      keyIndex: obj.keyIndex,
      pointsCategory: obj.pointsCategory,
    })
  }

  toEncodable() {
    return RegisterFleetsPointsModifierInput.toEncodable(this)
  }
}
