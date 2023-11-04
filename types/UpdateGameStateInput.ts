import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateGameStateInputFields {
  /** Fleet settings */
  fleet: types.FleetInputFields | null
  /** Levers */
  levers: types.LeversInputFields | null
  /** Set of derived sub-levers used in `calculate_base_emissions()`. */
  baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtilInputFields | null
  /** Miscellaneous settings */
  misc: types.MiscVariablesInputFields | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateGameStateInputJSON {
  /** Fleet settings */
  fleet: types.FleetInputJSON | null
  /** Levers */
  levers: types.LeversInputJSON | null
  /** Set of derived sub-levers used in `calculate_base_emissions()`. */
  baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtilInputJSON | null
  /** Miscellaneous settings */
  misc: types.MiscVariablesInputJSON | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update instruction */
export class UpdateGameStateInput {
  /** Fleet settings */
  readonly fleet: types.FleetInput | null
  /** Levers */
  readonly levers: types.LeversInput | null
  /** Set of derived sub-levers used in `calculate_base_emissions()`. */
  readonly baseEmissionsBySizeUtil: types.BaseEmissionsBySizeUtilInput | null
  /** Miscellaneous settings */
  readonly misc: types.MiscVariablesInput | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateGameStateInputFields) {
    this.fleet =
      (fields.fleet && new types.FleetInput({ ...fields.fleet })) || null
    this.levers =
      (fields.levers && new types.LeversInput({ ...fields.levers })) || null
    this.baseEmissionsBySizeUtil =
      (fields.baseEmissionsBySizeUtil &&
        new types.BaseEmissionsBySizeUtilInput({
          ...fields.baseEmissionsBySizeUtil,
        })) ||
      null
    this.misc =
      (fields.misc && new types.MiscVariablesInput({ ...fields.misc })) || null
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(types.FleetInput.layout(), "fleet"),
        borsh.option(types.LeversInput.layout(), "levers"),
        borsh.option(
          types.BaseEmissionsBySizeUtilInput.layout(),
          "baseEmissionsBySizeUtil"
        ),
        borsh.option(types.MiscVariablesInput.layout(), "misc"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateGameStateInput({
      fleet: (obj.fleet && types.FleetInput.fromDecoded(obj.fleet)) || null,
      levers: (obj.levers && types.LeversInput.fromDecoded(obj.levers)) || null,
      baseEmissionsBySizeUtil:
        (obj.baseEmissionsBySizeUtil &&
          types.BaseEmissionsBySizeUtilInput.fromDecoded(
            obj.baseEmissionsBySizeUtil
          )) ||
        null,
      misc:
        (obj.misc && types.MiscVariablesInput.fromDecoded(obj.misc)) || null,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateGameStateInputFields) {
    return {
      fleet:
        (fields.fleet && types.FleetInput.toEncodable(fields.fleet)) || null,
      levers:
        (fields.levers && types.LeversInput.toEncodable(fields.levers)) || null,
      baseEmissionsBySizeUtil:
        (fields.baseEmissionsBySizeUtil &&
          types.BaseEmissionsBySizeUtilInput.toEncodable(
            fields.baseEmissionsBySizeUtil
          )) ||
        null,
      misc:
        (fields.misc && types.MiscVariablesInput.toEncodable(fields.misc)) ||
        null,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateGameStateInputJSON {
    return {
      fleet: (this.fleet && this.fleet.toJSON()) || null,
      levers: (this.levers && this.levers.toJSON()) || null,
      baseEmissionsBySizeUtil:
        (this.baseEmissionsBySizeUtil &&
          this.baseEmissionsBySizeUtil.toJSON()) ||
        null,
      misc: (this.misc && this.misc.toJSON()) || null,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateGameStateInputJSON): UpdateGameStateInput {
    return new UpdateGameStateInput({
      fleet: (obj.fleet && types.FleetInput.fromJSON(obj.fleet)) || null,
      levers: (obj.levers && types.LeversInput.fromJSON(obj.levers)) || null,
      baseEmissionsBySizeUtil:
        (obj.baseEmissionsBySizeUtil &&
          types.BaseEmissionsBySizeUtilInput.fromJSON(
            obj.baseEmissionsBySizeUtil
          )) ||
        null,
      misc: (obj.misc && types.MiscVariablesInput.fromJSON(obj.misc)) || null,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateGameStateInput.toEncodable(this)
  }
}
