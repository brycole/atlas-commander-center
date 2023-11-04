import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AddShipEscrowInputFields {
  /** Amount of `Ship` tokens to transfer to escrow */
  shipAmount: BN
  /**
   * Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer`
   * Some index `WrappedShipEscrow`, or None for new `WrappedShipEscrow`
   */
  index: number | null
}

export interface AddShipEscrowInputJSON {
  /** Amount of `Ship` tokens to transfer to escrow */
  shipAmount: string
  /**
   * Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer`
   * Some index `WrappedShipEscrow`, or None for new `WrappedShipEscrow`
   */
  index: number | null
}

/** Struct for data input for `AddShipEscrow` */
export class AddShipEscrowInput {
  /** Amount of `Ship` tokens to transfer to escrow */
  readonly shipAmount: BN
  /**
   * Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer`
   * Some index `WrappedShipEscrow`, or None for new `WrappedShipEscrow`
   */
  readonly index: number | null

  constructor(fields: AddShipEscrowInputFields) {
    this.shipAmount = fields.shipAmount
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("shipAmount"), borsh.option(borsh.u32(), "index")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AddShipEscrowInput({
      shipAmount: obj.shipAmount,
      index: obj.index,
    })
  }

  static toEncodable(fields: AddShipEscrowInputFields) {
    return {
      shipAmount: fields.shipAmount,
      index: fields.index,
    }
  }

  toJSON(): AddShipEscrowInputJSON {
    return {
      shipAmount: this.shipAmount.toString(),
      index: this.index,
    }
  }

  static fromJSON(obj: AddShipEscrowInputJSON): AddShipEscrowInput {
    return new AddShipEscrowInput({
      shipAmount: new BN(obj.shipAmount),
      index: obj.index,
    })
  }

  toEncodable() {
    return AddShipEscrowInput.toEncodable(this)
  }
}
