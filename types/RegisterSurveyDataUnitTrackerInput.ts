import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterSurveyDataUnitTrackerInputFields {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  probability: number
  /** The max number of SDUs that can be found while scanning */
  max: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface RegisterSurveyDataUnitTrackerInputJSON {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  probability: number
  /** The max number of SDUs that can be found while scanning */
  max: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Register SurveyDataUnitTracker */
export class RegisterSurveyDataUnitTrackerInput {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  readonly limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  readonly scanCooldown: number
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  readonly probability: number
  /** The max number of SDUs that can be found while scanning */
  readonly max: number
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterSurveyDataUnitTrackerInputFields) {
    this.limit = fields.limit
    this.scanCooldown = fields.scanCooldown
    this.probability = fields.probability
    this.max = fields.max
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("limit"),
        borsh.u16("scanCooldown"),
        borsh.u16("probability"),
        borsh.u16("max"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterSurveyDataUnitTrackerInput({
      limit: obj.limit,
      scanCooldown: obj.scanCooldown,
      probability: obj.probability,
      max: obj.max,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterSurveyDataUnitTrackerInputFields) {
    return {
      limit: fields.limit,
      scanCooldown: fields.scanCooldown,
      probability: fields.probability,
      max: fields.max,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterSurveyDataUnitTrackerInputJSON {
    return {
      limit: this.limit,
      scanCooldown: this.scanCooldown,
      probability: this.probability,
      max: this.max,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: RegisterSurveyDataUnitTrackerInputJSON
  ): RegisterSurveyDataUnitTrackerInput {
    return new RegisterSurveyDataUnitTrackerInput({
      limit: obj.limit,
      scanCooldown: obj.scanCooldown,
      probability: obj.probability,
      max: obj.max,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterSurveyDataUnitTrackerInput.toEncodable(this)
  }
}
