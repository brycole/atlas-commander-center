import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterStarbaseInputUnpackedFields {
  /** `Starbase` name */
  name: Array<number>
  /** `Starbase` coordinates */
  subCoordinates: Array<BN>
  /** The index representing the level of the `Starbase` in the game variables. */
  starbaseLevelIndex: number
  /** The `Starbase` faction */
  faction: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

export interface RegisterStarbaseInputUnpackedJSON {
  /** `Starbase` name */
  name: Array<number>
  /** `Starbase` coordinates */
  subCoordinates: Array<string>
  /** The index representing the level of the `Starbase` in the game variables. */
  starbaseLevelIndex: number
  /** The `Starbase` faction */
  faction: number
  /** the index of the key in the fleet permissions profile */
  keyIndex: number
}

/** Unpacked version of [`RegisterStarbaseInput`] */
export class RegisterStarbaseInputUnpacked {
  /** `Starbase` name */
  readonly name: Array<number>
  /** `Starbase` coordinates */
  readonly subCoordinates: Array<BN>
  /** The index representing the level of the `Starbase` in the game variables. */
  readonly starbaseLevelIndex: number
  /** The `Starbase` faction */
  readonly faction: number
  /** the index of the key in the fleet permissions profile */
  readonly keyIndex: number

  constructor(fields: RegisterStarbaseInputUnpackedFields) {
    this.name = fields.name
    this.subCoordinates = fields.subCoordinates
    this.starbaseLevelIndex = fields.starbaseLevelIndex
    this.faction = fields.faction
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 64, "name"),
        borsh.array(borsh.i64(), 2, "subCoordinates"),
        borsh.u8("starbaseLevelIndex"),
        borsh.u8("faction"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterStarbaseInputUnpacked({
      name: obj.name,
      subCoordinates: obj.subCoordinates,
      starbaseLevelIndex: obj.starbaseLevelIndex,
      faction: obj.faction,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: RegisterStarbaseInputUnpackedFields) {
    return {
      name: fields.name,
      subCoordinates: fields.subCoordinates,
      starbaseLevelIndex: fields.starbaseLevelIndex,
      faction: fields.faction,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): RegisterStarbaseInputUnpackedJSON {
    return {
      name: this.name,
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      starbaseLevelIndex: this.starbaseLevelIndex,
      faction: this.faction,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: RegisterStarbaseInputUnpackedJSON
  ): RegisterStarbaseInputUnpacked {
    return new RegisterStarbaseInputUnpacked({
      name: obj.name,
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      starbaseLevelIndex: obj.starbaseLevelIndex,
      faction: obj.faction,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return RegisterStarbaseInputUnpacked.toEncodable(this)
  }
}
