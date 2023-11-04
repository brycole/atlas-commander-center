import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateStarInputFields {
  /** `Star` name */
  name: Array<number> | null
  /** `Star` size */
  size: BN | null
  /** `Star` type */
  starType: number | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateStarInputJSON {
  /** `Star` name */
  name: Array<number> | null
  /** `Star` size */
  size: string | null
  /** `Star` type */
  starType: number | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update Star */
export class UpdateStarInput {
  /** `Star` name */
  readonly name: Array<number> | null
  /** `Star` size */
  readonly size: BN | null
  /** `Star` type */
  readonly starType: number | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateStarInputFields) {
    this.name = fields.name
    this.size = fields.size
    this.starType = fields.starType
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.array(borsh.u8(), 64), "name"),
        borsh.option(borsh.u64(), "size"),
        borsh.option(borsh.u8(), "starType"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateStarInput({
      name: obj.name,
      size: obj.size,
      starType: obj.starType,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateStarInputFields) {
    return {
      name: fields.name,
      size: fields.size,
      starType: fields.starType,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateStarInputJSON {
    return {
      name: this.name,
      size: (this.size && this.size.toString()) || null,
      starType: this.starType,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateStarInputJSON): UpdateStarInput {
    return new UpdateStarInput({
      name: obj.name,
      size: (obj.size && new BN(obj.size)) || null,
      starType: obj.starType,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateStarInput.toEncodable(this)
  }
}
