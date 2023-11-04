import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateShipEscrowInputFields {
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
}

export interface UpdateShipEscrowInputJSON {
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
}

/** Struct for data input for `UpdateShipEscrow` */
export class UpdateShipEscrowInput {
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  readonly shipEscrowIndex: number

  constructor(fields: UpdateShipEscrowInputFields) {
    this.shipEscrowIndex = fields.shipEscrowIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u32("shipEscrowIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateShipEscrowInput({
      shipEscrowIndex: obj.shipEscrowIndex,
    })
  }

  static toEncodable(fields: UpdateShipEscrowInputFields) {
    return {
      shipEscrowIndex: fields.shipEscrowIndex,
    }
  }

  toJSON(): UpdateShipEscrowInputJSON {
    return {
      shipEscrowIndex: this.shipEscrowIndex,
    }
  }

  static fromJSON(obj: UpdateShipEscrowInputJSON): UpdateShipEscrowInput {
    return new UpdateShipEscrowInput({
      shipEscrowIndex: obj.shipEscrowIndex,
    })
  }

  toEncodable() {
    return UpdateShipEscrowInput.toEncodable(this)
  }
}
