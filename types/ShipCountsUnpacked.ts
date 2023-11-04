import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShipCountsUnpackedFields {
  /** The total number of ships in the fleet. */
  total: number
  /**
   * Used when updating a fleet.
   * Value is 0 when fleet update is in progress
   */
  updated: number
  /** The number of xx small ships in the fleet. */
  xxSmall: number
  /** The number of x small ships in the fleet. */
  xSmall: number
  /** The number of small ships in the fleet. */
  small: number
  /** The number of medium ships in the fleet. */
  medium: number
  /** The number of large ships in the fleet. */
  large: number
  /** The number of capital ships in the fleet. */
  capital: number
  /** The number of commander ships in the fleet. */
  commander: number
  /** The number of titan ships in the fleet. */
  titan: number
}

export interface ShipCountsUnpackedJSON {
  /** The total number of ships in the fleet. */
  total: number
  /**
   * Used when updating a fleet.
   * Value is 0 when fleet update is in progress
   */
  updated: number
  /** The number of xx small ships in the fleet. */
  xxSmall: number
  /** The number of x small ships in the fleet. */
  xSmall: number
  /** The number of small ships in the fleet. */
  small: number
  /** The number of medium ships in the fleet. */
  medium: number
  /** The number of large ships in the fleet. */
  large: number
  /** The number of capital ships in the fleet. */
  capital: number
  /** The number of commander ships in the fleet. */
  commander: number
  /** The number of titan ships in the fleet. */
  titan: number
}

/** Unpacked version of [`ShipCounts`] */
export class ShipCountsUnpacked {
  /** The total number of ships in the fleet. */
  readonly total: number
  /**
   * Used when updating a fleet.
   * Value is 0 when fleet update is in progress
   */
  readonly updated: number
  /** The number of xx small ships in the fleet. */
  readonly xxSmall: number
  /** The number of x small ships in the fleet. */
  readonly xSmall: number
  /** The number of small ships in the fleet. */
  readonly small: number
  /** The number of medium ships in the fleet. */
  readonly medium: number
  /** The number of large ships in the fleet. */
  readonly large: number
  /** The number of capital ships in the fleet. */
  readonly capital: number
  /** The number of commander ships in the fleet. */
  readonly commander: number
  /** The number of titan ships in the fleet. */
  readonly titan: number

  constructor(fields: ShipCountsUnpackedFields) {
    this.total = fields.total
    this.updated = fields.updated
    this.xxSmall = fields.xxSmall
    this.xSmall = fields.xSmall
    this.small = fields.small
    this.medium = fields.medium
    this.large = fields.large
    this.capital = fields.capital
    this.commander = fields.commander
    this.titan = fields.titan
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("total"),
        borsh.u32("updated"),
        borsh.u16("xxSmall"),
        borsh.u16("xSmall"),
        borsh.u16("small"),
        borsh.u16("medium"),
        borsh.u16("large"),
        borsh.u16("capital"),
        borsh.u16("commander"),
        borsh.u16("titan"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShipCountsUnpacked({
      total: obj.total,
      updated: obj.updated,
      xxSmall: obj.xxSmall,
      xSmall: obj.xSmall,
      small: obj.small,
      medium: obj.medium,
      large: obj.large,
      capital: obj.capital,
      commander: obj.commander,
      titan: obj.titan,
    })
  }

  static toEncodable(fields: ShipCountsUnpackedFields) {
    return {
      total: fields.total,
      updated: fields.updated,
      xxSmall: fields.xxSmall,
      xSmall: fields.xSmall,
      small: fields.small,
      medium: fields.medium,
      large: fields.large,
      capital: fields.capital,
      commander: fields.commander,
      titan: fields.titan,
    }
  }

  toJSON(): ShipCountsUnpackedJSON {
    return {
      total: this.total,
      updated: this.updated,
      xxSmall: this.xxSmall,
      xSmall: this.xSmall,
      small: this.small,
      medium: this.medium,
      large: this.large,
      capital: this.capital,
      commander: this.commander,
      titan: this.titan,
    }
  }

  static fromJSON(obj: ShipCountsUnpackedJSON): ShipCountsUnpacked {
    return new ShipCountsUnpacked({
      total: obj.total,
      updated: obj.updated,
      xxSmall: obj.xxSmall,
      xSmall: obj.xSmall,
      small: obj.small,
      medium: obj.medium,
      large: obj.large,
      capital: obj.capital,
      commander: obj.commander,
      titan: obj.titan,
    })
  }

  toEncodable() {
    return ShipCountsUnpacked.toEncodable(this)
  }
}
