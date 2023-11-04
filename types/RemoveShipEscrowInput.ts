import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RemoveShipEscrowInputFields {
  /** Amount of `Ship` tokens to transfer from escrow */
  shipAmount: BN
  /** the index of the `ProfileKey` in `Profile` with required permissions */
  permissionKeyIndex: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
}

export interface RemoveShipEscrowInputJSON {
  /** Amount of `Ship` tokens to transfer from escrow */
  shipAmount: string
  /** the index of the `ProfileKey` in `Profile` with required permissions */
  permissionKeyIndex: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
}

/** Struct for data input for `RemoveShipEscrow` */
export class RemoveShipEscrowInput {
  /** Amount of `Ship` tokens to transfer from escrow */
  readonly shipAmount: BN
  /** the index of the `ProfileKey` in `Profile` with required permissions */
  readonly permissionKeyIndex: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  readonly shipEscrowIndex: number

  constructor(fields: RemoveShipEscrowInputFields) {
    this.shipAmount = fields.shipAmount
    this.permissionKeyIndex = fields.permissionKeyIndex
    this.shipEscrowIndex = fields.shipEscrowIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("shipAmount"),
        borsh.u16("permissionKeyIndex"),
        borsh.u32("shipEscrowIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RemoveShipEscrowInput({
      shipAmount: obj.shipAmount,
      permissionKeyIndex: obj.permissionKeyIndex,
      shipEscrowIndex: obj.shipEscrowIndex,
    })
  }

  static toEncodable(fields: RemoveShipEscrowInputFields) {
    return {
      shipAmount: fields.shipAmount,
      permissionKeyIndex: fields.permissionKeyIndex,
      shipEscrowIndex: fields.shipEscrowIndex,
    }
  }

  toJSON(): RemoveShipEscrowInputJSON {
    return {
      shipAmount: this.shipAmount.toString(),
      permissionKeyIndex: this.permissionKeyIndex,
      shipEscrowIndex: this.shipEscrowIndex,
    }
  }

  static fromJSON(obj: RemoveShipEscrowInputJSON): RemoveShipEscrowInput {
    return new RemoveShipEscrowInput({
      shipAmount: new BN(obj.shipAmount),
      permissionKeyIndex: obj.permissionKeyIndex,
      shipEscrowIndex: obj.shipEscrowIndex,
    })
  }

  toEncodable() {
    return RemoveShipEscrowInput.toEncodable(this)
  }
}
