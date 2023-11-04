import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BaseEmissionsBySizeUtilFields {
  /** xx_small */
  xxSmall: BN
  /** x_small */
  xSmall: BN
  /** small */
  small: BN
  /** medium */
  medium: BN
  /** large */
  large: BN
  /** capital */
  capital: BN
  /** commander */
  commander: BN
  /** titan */
  titan: BN
}

export interface BaseEmissionsBySizeUtilJSON {
  /** xx_small */
  xxSmall: string
  /** x_small */
  xSmall: string
  /** small */
  small: string
  /** medium */
  medium: string
  /** large */
  large: string
  /** capital */
  capital: string
  /** commander */
  commander: string
  /** titan */
  titan: string
}

/** Type containing derived sub-levers used in `calculate_base_emissions()` discriminated by ship size */
export class BaseEmissionsBySizeUtil {
  /** xx_small */
  readonly xxSmall: BN
  /** x_small */
  readonly xSmall: BN
  /** small */
  readonly small: BN
  /** medium */
  readonly medium: BN
  /** large */
  readonly large: BN
  /** capital */
  readonly capital: BN
  /** commander */
  readonly commander: BN
  /** titan */
  readonly titan: BN

  constructor(fields: BaseEmissionsBySizeUtilFields) {
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
        borsh.u64("xxSmall"),
        borsh.u64("xSmall"),
        borsh.u64("small"),
        borsh.u64("medium"),
        borsh.u64("large"),
        borsh.u64("capital"),
        borsh.u64("commander"),
        borsh.u64("titan"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BaseEmissionsBySizeUtil({
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

  static toEncodable(fields: BaseEmissionsBySizeUtilFields) {
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

  toJSON(): BaseEmissionsBySizeUtilJSON {
    return {
      xxSmall: this.xxSmall.toString(),
      xSmall: this.xSmall.toString(),
      small: this.small.toString(),
      medium: this.medium.toString(),
      large: this.large.toString(),
      capital: this.capital.toString(),
      commander: this.commander.toString(),
      titan: this.titan.toString(),
    }
  }

  static fromJSON(obj: BaseEmissionsBySizeUtilJSON): BaseEmissionsBySizeUtil {
    return new BaseEmissionsBySizeUtil({
      xxSmall: new BN(obj.xxSmall),
      xSmall: new BN(obj.xSmall),
      small: new BN(obj.small),
      medium: new BN(obj.medium),
      large: new BN(obj.large),
      capital: new BN(obj.capital),
      commander: new BN(obj.commander),
      titan: new BN(obj.titan),
    })
  }

  toEncodable() {
    return BaseEmissionsBySizeUtil.toEncodable(this)
  }
}
