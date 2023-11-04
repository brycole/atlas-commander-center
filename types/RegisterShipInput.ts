import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterShipInputFields {
  /** The `Ship` name/label */
  name: Array<number>
  /** the ship's size class */
  sizeClass: types.SizeClassKind
  /** The stats for the ship */
  stats: types.ShipStatsUnpackedFields
  /** the index of the key in the sector permissions profile */
  keyIndex: number
  /** Whether the ship is initialized to active (`update_id == current_update_id`) */
  isActive: boolean
}

export interface RegisterShipInputJSON {
  /** The `Ship` name/label */
  name: Array<number>
  /** the ship's size class */
  sizeClass: types.SizeClassJSON
  /** The stats for the ship */
  stats: types.ShipStatsUnpackedJSON
  /** the index of the key in the sector permissions profile */
  keyIndex: number
  /** Whether the ship is initialized to active (`update_id == current_update_id`) */
  isActive: boolean
}

/** Struct for data input to Register Ship */
export class RegisterShipInput {
  /** The `Ship` name/label */
  readonly name: Array<number>
  /** the ship's size class */
  readonly sizeClass: types.SizeClassKind
  /** The stats for the ship */
  readonly stats: types.ShipStatsUnpacked
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number
  /** Whether the ship is initialized to active (`update_id == current_update_id`) */
  readonly isActive: boolean

  constructor(fields: RegisterShipInputFields) {
    this.name = fields.name
    this.sizeClass = fields.sizeClass
    this.stats = new types.ShipStatsUnpacked({ ...fields.stats })
    this.keyIndex = fields.keyIndex
    this.isActive = fields.isActive
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        types.SizeClass.layout("sizeClass"),
        types.ShipStatsUnpacked.layout("stats"),
        borsh.u16("keyIndex"),
        borsh.bool("isActive"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterShipInput({
      name: obj.name,
      sizeClass: types.SizeClass.fromDecoded(obj.sizeClass),
      stats: types.ShipStatsUnpacked.fromDecoded(obj.stats),
      keyIndex: obj.keyIndex,
      isActive: obj.isActive,
    })
  }

  static toEncodable(fields: RegisterShipInputFields) {
    return {
      name: fields.name,
      sizeClass: fields.sizeClass.toEncodable(),
      stats: types.ShipStatsUnpacked.toEncodable(fields.stats),
      keyIndex: fields.keyIndex,
      isActive: fields.isActive,
    }
  }

  toJSON(): RegisterShipInputJSON {
    return {
      name: this.name,
      sizeClass: this.sizeClass.toJSON(),
      stats: this.stats.toJSON(),
      keyIndex: this.keyIndex,
      isActive: this.isActive,
    }
  }

  static fromJSON(obj: RegisterShipInputJSON): RegisterShipInput {
    return new RegisterShipInput({
      name: obj.name,
      sizeClass: types.SizeClass.fromJSON(obj.sizeClass),
      stats: types.ShipStatsUnpacked.fromJSON(obj.stats),
      keyIndex: obj.keyIndex,
      isActive: obj.isActive,
    })
  }

  toEncodable() {
    return RegisterShipInput.toEncodable(this)
  }
}
