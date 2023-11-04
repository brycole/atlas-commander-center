import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ScanForSurveyDataUnitsInputFields {
  /** The index of the key in the player profile */
  keyIndex: number
}

export interface ScanForSurveyDataUnitsInputJSON {
  /** The index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to Scan For Survey Data Units */
export class ScanForSurveyDataUnitsInput {
  /** The index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: ScanForSurveyDataUnitsInputFields) {
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ScanForSurveyDataUnitsInput({
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: ScanForSurveyDataUnitsInputFields) {
    return {
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): ScanForSurveyDataUnitsInputJSON {
    return {
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: ScanForSurveyDataUnitsInputJSON
  ): ScanForSurveyDataUnitsInput {
    return new ScanForSurveyDataUnitsInput({
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return ScanForSurveyDataUnitsInput.toEncodable(this)
  }
}
