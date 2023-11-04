import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateResourceInputFields {
  /** `Resource` richness */
  systemRichness: number | null
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

export interface UpdateResourceInputJSON {
  /** `Resource` richness */
  systemRichness: number | null
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

/** Struct for data input to Update Resource */
export class UpdateResourceInput {
  /** `Resource` richness */
  readonly systemRichness: number | null
  /** the index of the key in the fleet permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateResourceInputFields) {
    this.systemRichness = fields.systemRichness
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.option(borsh.u16(), "systemRichness"), borsh.u16("keyIndex")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateResourceInput({
      systemRichness: obj.systemRichness,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateResourceInputFields) {
    return {
      systemRichness: fields.systemRichness,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateResourceInputJSON {
    return {
      systemRichness: this.systemRichness,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateResourceInputJSON): UpdateResourceInput {
    return new UpdateResourceInput({
      systemRichness: obj.systemRichness,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateResourceInput.toEncodable(this)
  }
}
