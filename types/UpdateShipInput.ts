import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateShipInputFields {
  /** The `Ship` name/label */
  name: Array<number>
  /** the ship's size class */
  sizeClass: types.SizeClassKind
  /** The stats for the ship */
  stats: types.ShipStatsUnpackedFields
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

export interface UpdateShipInputJSON {
  /** The `Ship` name/label */
  name: Array<number>
  /** the ship's size class */
  sizeClass: types.SizeClassJSON
  /** The stats for the ship */
  stats: types.ShipStatsUnpackedJSON
  /** the index of the key in the sector permissions profile */
  keyIndex: number
}

/** Struct for data input to Update Ship */
export class UpdateShipInput {
  /** The `Ship` name/label */
  readonly name: Array<number>
  /** the ship's size class */
  readonly sizeClass: types.SizeClassKind
  /** The stats for the ship */
  readonly stats: types.ShipStatsUnpacked
  /** the index of the key in the sector permissions profile */
  readonly keyIndex: number

  constructor(fields: UpdateShipInputFields) {
    this.name = fields.name
    this.sizeClass = fields.sizeClass
    this.stats = new types.ShipStatsUnpacked({ ...fields.stats })
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        types.SizeClass.layout("sizeClass"),
        types.ShipStatsUnpacked.layout("stats"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateShipInput({
      name: obj.name,
      sizeClass: types.SizeClass.fromDecoded(obj.sizeClass),
      stats: types.ShipStatsUnpacked.fromDecoded(obj.stats),
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: UpdateShipInputFields) {
    return {
      name: fields.name,
      sizeClass: fields.sizeClass.toEncodable(),
      stats: types.ShipStatsUnpacked.toEncodable(fields.stats),
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): UpdateShipInputJSON {
    return {
      name: this.name,
      sizeClass: this.sizeClass.toJSON(),
      stats: this.stats.toJSON(),
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: UpdateShipInputJSON): UpdateShipInput {
    return new UpdateShipInput({
      name: obj.name,
      sizeClass: types.SizeClass.fromJSON(obj.sizeClass),
      stats: types.ShipStatsUnpacked.fromJSON(obj.stats),
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return UpdateShipInput.toEncodable(this)
  }
}
