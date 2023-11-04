import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateSurveyDataUnitTrackerInputFields {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number | null
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number | null
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  probability: number | null
  /** The max number of SDUs that can be found while scanning */
  max: number | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateSurveyDataUnitTrackerInputJSON {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number | null
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number | null
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  probability: number | null
  /** The max number of SDUs that can be found while scanning */
  max: number | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update SurveyDataUnitTracker */
export class UpdateSurveyDataUnitTrackerInput {
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  readonly limit: number | null
  /** The amount of time that must go by before someone can scan a sector again */
  readonly scanCooldown: number | null
  /** The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage */
  readonly probability: number | null
  /** The max number of SDUs that can be found while scanning */
  readonly max: number | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateSurveyDataUnitTrackerInputFields) {
    this.limit = fields.limit
    this.scanCooldown = fields.scanCooldown
    this.probability = fields.probability
    this.max = fields.max
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.u32(), "limit"),
        borsh.option(borsh.u16(), "scanCooldown"),
        borsh.option(borsh.u16(), "probability"),
        borsh.option(borsh.u16(), "max"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateSurveyDataUnitTrackerInput({
      limit: obj.limit,
      scanCooldown: obj.scanCooldown,
      probability: obj.probability,
      max: obj.max,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateSurveyDataUnitTrackerInputFields) {
    return {
      limit: fields.limit,
      scanCooldown: fields.scanCooldown,
      probability: fields.probability,
      max: fields.max,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateSurveyDataUnitTrackerInputJSON {
    return {
      limit: this.limit,
      scanCooldown: this.scanCooldown,
      probability: this.probability,
      max: this.max,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: UpdateSurveyDataUnitTrackerInputJSON
  ): UpdateSurveyDataUnitTrackerInput {
    return new UpdateSurveyDataUnitTrackerInput({
      limit: obj.limit,
      scanCooldown: obj.scanCooldown,
      probability: obj.probability,
      max: obj.max,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateSurveyDataUnitTrackerInput.toEncodable(this)
  }
}
