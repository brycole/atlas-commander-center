import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterPlanetInputFields {
  /** `Planet` name */
  name: Array<number>
  /** `Planet` size */
  size: BN
  /** `Planet` max health */
  maxHp: BN
  /** `Planet` sub_coordinates */
  subCoordinates: Array<BN>
  /** `Planet` type */
  planetType: number
  /** `Planet` position */
  position: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface RegisterPlanetInputJSON {
  /** `Planet` name */
  name: Array<number>
  /** `Planet` size */
  size: string
  /** `Planet` max health */
  maxHp: string
  /** `Planet` sub_coordinates */
  subCoordinates: Array<string>
  /** `Planet` type */
  planetType: number
  /** `Planet` position */
  position: number
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Register Planet */
export class RegisterPlanetInput {
  /** `Planet` name */
  readonly name: Array<number>
  /** `Planet` size */
  readonly size: BN
  /** `Planet` max health */
  readonly maxHp: BN
  /** `Planet` sub_coordinates */
  readonly subCoordinates: Array<BN>
  /** `Planet` type */
  readonly planetType: number
  /** `Planet` position */
  readonly position: number
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterPlanetInputFields) {
    this.name = fields.name
    this.size = fields.size
    this.maxHp = fields.maxHp
    this.subCoordinates = fields.subCoordinates
    this.planetType = fields.planetType
    this.position = fields.position
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        borsh.u64("size"),
        borsh.u64("maxHp"),
        borsh.array(borsh.i64(), 2, "subCoordinates"),
        borsh.u8("planetType"),
        borsh.u8("position"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterPlanetInput({
      name: obj.name,
      size: obj.size,
      maxHp: obj.maxHp,
      subCoordinates: obj.subCoordinates,
      planetType: obj.planetType,
      position: obj.position,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterPlanetInputFields) {
    return {
      name: fields.name,
      size: fields.size,
      maxHp: fields.maxHp,
      subCoordinates: fields.subCoordinates,
      planetType: fields.planetType,
      position: fields.position,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterPlanetInputJSON {
    return {
      name: this.name,
      size: this.size.toString(),
      maxHp: this.maxHp.toString(),
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      planetType: this.planetType,
      position: this.position,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: RegisterPlanetInputJSON): RegisterPlanetInput {
    return new RegisterPlanetInput({
      name: obj.name,
      size: new BN(obj.size),
      maxHp: new BN(obj.maxHp),
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      planetType: obj.planetType,
      position: obj.position,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterPlanetInput.toEncodable(this)
  }
}
