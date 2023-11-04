import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdatePlanetInputFields {
  /** `Planet` name */
  name: Array<number> | null
  /** `Planet` size */
  size: BN | null
  /** `Planet` max_hp */
  maxHp: BN | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdatePlanetInputJSON {
  /** `Planet` name */
  name: Array<number> | null
  /** `Planet` size */
  size: string | null
  /** `Planet` max_hp */
  maxHp: string | null
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update Planet */
export class UpdatePlanetInput {
  /** `Planet` name */
  readonly name: Array<number> | null
  /** `Planet` size */
  readonly size: BN | null
  /** `Planet` max_hp */
  readonly maxHp: BN | null
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdatePlanetInputFields) {
    this.name = fields.name
    this.size = fields.size
    this.maxHp = fields.maxHp
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.array(borsh.u8(), 64), "name"),
        borsh.option(borsh.u64(), "size"),
        borsh.option(borsh.u64(), "maxHp"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdatePlanetInput({
      name: obj.name,
      size: obj.size,
      maxHp: obj.maxHp,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdatePlanetInputFields) {
    return {
      name: fields.name,
      size: fields.size,
      maxHp: fields.maxHp,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdatePlanetInputJSON {
    return {
      name: this.name,
      size: (this.size && this.size.toString()) || null,
      maxHp: (this.maxHp && this.maxHp.toString()) || null,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdatePlanetInputJSON): UpdatePlanetInput {
    return new UpdatePlanetInput({
      name: obj.name,
      size: (obj.size && new BN(obj.size)) || null,
      maxHp: (obj.maxHp && new BN(obj.maxHp)) || null,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdatePlanetInput.toEncodable(this)
  }
}
