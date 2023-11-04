import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FactionsStarbaseLevelInfoFields {
  /** Mud Starbase Levels Info */
  mud: Array<types.StarbaseLevelInfoFields>
  /** Oni Starbase Levels Info */
  oni: Array<types.StarbaseLevelInfoFields>
  /** Ustur Starbase Levels Info */
  ustur: Array<types.StarbaseLevelInfoFields>
}

export interface FactionsStarbaseLevelInfoJSON {
  /** Mud Starbase Levels Info */
  mud: Array<types.StarbaseLevelInfoJSON>
  /** Oni Starbase Levels Info */
  oni: Array<types.StarbaseLevelInfoJSON>
  /** Ustur Starbase Levels Info */
  ustur: Array<types.StarbaseLevelInfoJSON>
}

/** `Starbase` levels discriminated by faction */
export class FactionsStarbaseLevelInfo {
  /** Mud Starbase Levels Info */
  readonly mud: Array<types.StarbaseLevelInfo>
  /** Oni Starbase Levels Info */
  readonly oni: Array<types.StarbaseLevelInfo>
  /** Ustur Starbase Levels Info */
  readonly ustur: Array<types.StarbaseLevelInfo>

  constructor(fields: FactionsStarbaseLevelInfoFields) {
    this.mud = fields.mud.map(
      (item) => new types.StarbaseLevelInfo({ ...item })
    )
    this.oni = fields.oni.map(
      (item) => new types.StarbaseLevelInfo({ ...item })
    )
    this.ustur = fields.ustur.map(
      (item) => new types.StarbaseLevelInfo({ ...item })
    )
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(types.StarbaseLevelInfo.layout(), 7, "mud"),
        borsh.array(types.StarbaseLevelInfo.layout(), 7, "oni"),
        borsh.array(types.StarbaseLevelInfo.layout(), 7, "ustur"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FactionsStarbaseLevelInfo({
      mud: obj.mud.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.StarbaseLevelInfo.fromDecoded(item)
      ),
      oni: obj.oni.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.StarbaseLevelInfo.fromDecoded(item)
      ),
      ustur: obj.ustur.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.StarbaseLevelInfo.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: FactionsStarbaseLevelInfoFields) {
    return {
      mud: fields.mud.map((item) => types.StarbaseLevelInfo.toEncodable(item)),
      oni: fields.oni.map((item) => types.StarbaseLevelInfo.toEncodable(item)),
      ustur: fields.ustur.map((item) =>
        types.StarbaseLevelInfo.toEncodable(item)
      ),
    }
  }

  toJSON(): FactionsStarbaseLevelInfoJSON {
    return {
      mud: this.mud.map((item) => item.toJSON()),
      oni: this.oni.map((item) => item.toJSON()),
      ustur: this.ustur.map((item) => item.toJSON()),
    }
  }

  static fromJSON(
    obj: FactionsStarbaseLevelInfoJSON
  ): FactionsStarbaseLevelInfo {
    return new FactionsStarbaseLevelInfo({
      mud: obj.mud.map((item) => types.StarbaseLevelInfo.fromJSON(item)),
      oni: obj.oni.map((item) => types.StarbaseLevelInfo.fromJSON(item)),
      ustur: obj.ustur.map((item) => types.StarbaseLevelInfo.fromJSON(item)),
    })
  }

  toEncodable() {
    return FactionsStarbaseLevelInfo.toEncodable(this)
  }
}
