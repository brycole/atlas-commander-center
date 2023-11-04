import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SectorConnectionFields {
  /** The sector connected to */
  connectionSector: PublicKey
  /** The location of the connection */
  subCoordinates: Array<BN>
  /** Connection flags */
  flags: number
}

export interface SectorConnectionJSON {
  /** The sector connected to */
  connectionSector: string
  /** The location of the connection */
  subCoordinates: Array<string>
  /** Connection flags */
  flags: number
}

/** Connection between sectors */
export class SectorConnection {
  /** The sector connected to */
  readonly connectionSector: PublicKey
  /** The location of the connection */
  readonly subCoordinates: Array<BN>
  /** Connection flags */
  readonly flags: number

  constructor(fields: SectorConnectionFields) {
    this.connectionSector = fields.connectionSector
    this.subCoordinates = fields.subCoordinates
    this.flags = fields.flags
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("connectionSector"),
        borsh.array(borsh.i64(), 2, "subCoordinates"),
        borsh.u8("flags"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SectorConnection({
      connectionSector: obj.connectionSector,
      subCoordinates: obj.subCoordinates,
      flags: obj.flags,
    })
  }

  static toEncodable(fields: SectorConnectionFields) {
    return {
      connectionSector: fields.connectionSector,
      subCoordinates: fields.subCoordinates,
      flags: fields.flags,
    }
  }

  toJSON(): SectorConnectionJSON {
    return {
      connectionSector: this.connectionSector.toString(),
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      flags: this.flags,
    }
  }

  static fromJSON(obj: SectorConnectionJSON): SectorConnection {
    return new SectorConnection({
      connectionSector: new PublicKey(obj.connectionSector),
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      flags: obj.flags,
    })
  }

  toEncodable() {
    return SectorConnection.toEncodable(this)
  }
}
