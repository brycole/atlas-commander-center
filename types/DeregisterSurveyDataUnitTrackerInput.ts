import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DeregisterSurveyDataUnitTrackerInputFields {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface DeregisterSurveyDataUnitTrackerInputJSON {
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input that has `key_index` */
export class DeregisterSurveyDataUnitTrackerInput {
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: DeregisterSurveyDataUnitTrackerInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DeregisterSurveyDataUnitTrackerInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: DeregisterSurveyDataUnitTrackerInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): DeregisterSurveyDataUnitTrackerInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: DeregisterSurveyDataUnitTrackerInputJSON
  ): DeregisterSurveyDataUnitTrackerInput {
    return new DeregisterSurveyDataUnitTrackerInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return DeregisterSurveyDataUnitTrackerInput.toEncodable(this)
  }
}
