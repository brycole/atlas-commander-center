import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PointsFields {
  /** Represents the points category to use for XP (experience points) */
  xpPointsCategory: PublicKey
  /** Represents the points category to use for LP (loyalty points) */
  lpPointsCategory: PublicKey
}

export interface PointsJSON {
  /** Represents the points category to use for XP (experience points) */
  xpPointsCategory: string
  /** Represents the points category to use for LP (loyalty points) */
  lpPointsCategory: string
}

/** Variables for the Points program */
export class Points {
  /** Represents the points category to use for XP (experience points) */
  readonly xpPointsCategory: PublicKey
  /** Represents the points category to use for LP (loyalty points) */
  readonly lpPointsCategory: PublicKey

  constructor(fields: PointsFields) {
    this.xpPointsCategory = fields.xpPointsCategory
    this.lpPointsCategory = fields.lpPointsCategory
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("xpPointsCategory"),
        borsh.publicKey("lpPointsCategory"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Points({
      xpPointsCategory: obj.xpPointsCategory,
      lpPointsCategory: obj.lpPointsCategory,
    })
  }

  static toEncodable(fields: PointsFields) {
    return {
      xpPointsCategory: fields.xpPointsCategory,
      lpPointsCategory: fields.lpPointsCategory,
    }
  }

  toJSON(): PointsJSON {
    return {
      xpPointsCategory: this.xpPointsCategory.toString(),
      lpPointsCategory: this.lpPointsCategory.toString(),
    }
  }

  static fromJSON(obj: PointsJSON): Points {
    return new Points({
      xpPointsCategory: new PublicKey(obj.xpPointsCategory),
      lpPointsCategory: new PublicKey(obj.lpPointsCategory),
    })
  }

  toEncodable() {
    return Points.toEncodable(this)
  }
}
