import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterStarInputFields {
  /** `Star` name */
  name: Array<number>
  /** `Star` size */
  size: BN
  /** `Star` sub_coordinates */
  subCoordinates: Array<BN>
  /** `Star` type */
  starType: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface RegisterStarInputJSON {
  /** `Star` name */
  name: Array<number>
  /** `Star` size */
  size: string
  /** `Star` sub_coordinates */
  subCoordinates: Array<string>
  /** `Star` type */
  starType: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Register Star */
export class RegisterStarInput {
  /** `Star` name */
  readonly name: Array<number>
  /** `Star` size */
  readonly size: BN
  /** `Star` sub_coordinates */
  readonly subCoordinates: Array<BN>
  /** `Star` type */
  readonly starType: number
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterStarInputFields) {
    this.name = fields.name
    this.size = fields.size
    this.subCoordinates = fields.subCoordinates
    this.starType = fields.starType
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        borsh.u64("size"),
        borsh.array(borsh.i64(), 2, "subCoordinates"),
        borsh.u8("starType"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterStarInput({
      name: obj.name,
      size: obj.size,
      subCoordinates: obj.subCoordinates,
      starType: obj.starType,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterStarInputFields) {
    return {
      name: fields.name,
      size: fields.size,
      subCoordinates: fields.subCoordinates,
      starType: fields.starType,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterStarInputJSON {
    return {
      name: this.name,
      size: this.size.toString(),
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      starType: this.starType,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: RegisterStarInputJSON): RegisterStarInput {
    return new RegisterStarInput({
      name: obj.name,
      size: new BN(obj.size),
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      starType: obj.starType,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterStarInput.toEncodable(this)
  }
}
