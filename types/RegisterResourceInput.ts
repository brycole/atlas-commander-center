import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterResourceInputFields {
  /** `Resource` location type */
  locationType: number
  /** `Resource` `system_richness` */
  systemRichness: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

export interface RegisterResourceInputJSON {
  /** `Resource` location type */
  locationType: number
  /** `Resource` `system_richness` */
  systemRichness: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

/** Struct for data input to Register a Resource */
export class RegisterResourceInput {
  /** `Resource` location type */
  readonly locationType: number
  /** `Resource` `system_richness` */
  readonly systemRichness: number
  /** the index of the key in the fleet permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterResourceInputFields) {
    this.locationType = fields.locationType
    this.systemRichness = fields.systemRichness
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("locationType"),
        borsh.u16("systemRichness"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterResourceInput({
      locationType: obj.locationType,
      systemRichness: obj.systemRichness,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterResourceInputFields) {
    return {
      locationType: fields.locationType,
      systemRichness: fields.systemRichness,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterResourceInputJSON {
    return {
      locationType: this.locationType,
      systemRichness: this.systemRichness,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: RegisterResourceInputJSON): RegisterResourceInput {
    return new RegisterResourceInput({
      locationType: obj.locationType,
      systemRichness: obj.systemRichness,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterResourceInput.toEncodable(this)
  }
}
