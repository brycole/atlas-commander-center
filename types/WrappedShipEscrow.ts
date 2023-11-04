import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface WrappedShipEscrowFields {
  /** The `Ship` account address */
  ship: PublicKey
  /** The `Ship` token amount in escrow */
  amount: BN
  /** The update id for the `Ship` */
  updateId: BN
}

export interface WrappedShipEscrowJSON {
  /** The `Ship` account address */
  ship: string
  /** The `Ship` token amount in escrow */
  amount: string
  /** The update id for the `Ship` */
  updateId: string
}

/** Wrapped `Ship` escrow info */
export class WrappedShipEscrow {
  /** The `Ship` account address */
  readonly ship: PublicKey
  /** The `Ship` token amount in escrow */
  readonly amount: BN
  /** The update id for the `Ship` */
  readonly updateId: BN

  constructor(fields: WrappedShipEscrowFields) {
    this.ship = fields.ship
    this.amount = fields.amount
    this.updateId = fields.updateId
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("ship"), borsh.u64("amount"), borsh.u64("updateId")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new WrappedShipEscrow({
      ship: obj.ship,
      amount: obj.amount,
      updateId: obj.updateId,
    })
  }

  static toEncodable(fields: WrappedShipEscrowFields) {
    return {
      ship: fields.ship,
      amount: fields.amount,
      updateId: fields.updateId,
    }
  }

  toJSON(): WrappedShipEscrowJSON {
    return {
      ship: this.ship.toString(),
      amount: this.amount.toString(),
      updateId: this.updateId.toString(),
    }
  }

  static fromJSON(obj: WrappedShipEscrowJSON): WrappedShipEscrow {
    return new WrappedShipEscrow({
      ship: new PublicKey(obj.ship),
      amount: new BN(obj.amount),
      updateId: new BN(obj.updateId),
    })
  }

  toEncodable() {
    return WrappedShipEscrow.toEncodable(this)
  }
}
