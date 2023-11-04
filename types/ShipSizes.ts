import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ShipSizesFields {
  /** The size of xx small ships */
  xxSmall: number
  /** The size of x small ships */
  xSmall: number
  /** The size of small ships */
  small: number
  /** The size of medium ships */
  medium: number
  /** The size of large ships */
  large: number
  /** The size of capital ships */
  capital: number
  /** The size of commander ships */
  commander: number
  /** The size of titan ships */
  titan: number
}

export interface ShipSizesJSON {
  /** The size of xx small ships */
  xxSmall: number
  /** The size of x small ships */
  xSmall: number
  /** The size of small ships */
  small: number
  /** The size of medium ships */
  medium: number
  /** The size of large ships */
  large: number
  /** The size of capital ships */
  capital: number
  /** The size of commander ships */
  commander: number
  /** The size of titan ships */
  titan: number
}

/** Ship sizes. */
export class ShipSizes {
  /** The size of xx small ships */
  readonly xxSmall: number
  /** The size of x small ships */
  readonly xSmall: number
  /** The size of small ships */
  readonly small: number
  /** The size of medium ships */
  readonly medium: number
  /** The size of large ships */
  readonly large: number
  /** The size of capital ships */
  readonly capital: number
  /** The size of commander ships */
  readonly commander: number
  /** The size of titan ships */
  readonly titan: number

  constructor(fields: ShipSizesFields) {
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
        borsh.u8("xxSmall"),
        borsh.u8("xSmall"),
        borsh.u8("small"),
        borsh.u8("medium"),
        borsh.u8("large"),
        borsh.u8("capital"),
        borsh.u8("commander"),
        borsh.u8("titan"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ShipSizes({
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

  static toEncodable(fields: ShipSizesFields) {
    return {
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

  toJSON(): ShipSizesJSON {
    return {
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

  static fromJSON(obj: ShipSizesJSON): ShipSizes {
    return new ShipSizes({
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
    return ShipSizes.toEncodable(this)
  }
}
