import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateStarbaseInputFields {
  /** `Starbase` name */
  name: Array<number> | null
  /** `Starbase` coordinates */
  subCoordinates: Array<BN> | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateStarbaseInputJSON {
  /** `Starbase` name */
  name: Array<number> | null
  /** `Starbase` coordinates */
  subCoordinates: Array<string> | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update `Starbase` */
export class UpdateStarbaseInput {
  /** `Starbase` name */
  readonly name: Array<number> | null
  /** `Starbase` coordinates */
  readonly subCoordinates: Array<BN> | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateStarbaseInputFields) {
    this.name = fields.name
    this.subCoordinates = fields.subCoordinates
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.array(borsh.u8(), 64), "name"),
        borsh.option(borsh.array(borsh.i64(), 2), "subCoordinates"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateStarbaseInput({
      name: obj.name,
      subCoordinates: obj.subCoordinates,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateStarbaseInputFields) {
    return {
      name: fields.name,
      subCoordinates: fields.subCoordinates,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateStarbaseInputJSON {
    return {
      name: this.name,
      subCoordinates:
        (this.subCoordinates &&
          this.subCoordinates.map((item) => item.toString())) ||
        null,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateStarbaseInputJSON): UpdateStarbaseInput {
    return new UpdateStarbaseInput({
      name: obj.name,
      subCoordinates:
        (obj.subCoordinates &&
          obj.subCoordinates.map((item) => new BN(item))) ||
        null,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateStarbaseInput.toEncodable(this)
  }
}
