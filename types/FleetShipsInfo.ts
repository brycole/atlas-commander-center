import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FleetShipsInfoFields {
  /** The `Ship` account address */
  ship: PublicKey
  /** The `Ship` token amount in escrow */
  amount: BN
  /** The update id for the `Ship` */
  updateId: BN
}

export interface FleetShipsInfoJSON {
  /** The `Ship` account address */
  ship: string
  /** The `Ship` token amount in escrow */
  amount: string
  /** The update id for the `Ship` */
  updateId: string
}

/** Struct that represents info on a single ship type in a fleet */
export class FleetShipsInfo {
  /** The `Ship` account address */
  readonly ship: PublicKey
  /** The `Ship` token amount in escrow */
  readonly amount: BN
  /** The update id for the `Ship` */
  readonly updateId: BN

  constructor(fields: FleetShipsInfoFields) {
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
    return new FleetShipsInfo({
      ship: obj.ship,
      amount: obj.amount,
      updateId: obj.updateId,
    })
  }

  static toEncodable(fields: FleetShipsInfoFields) {
    return {
      ship: fields.ship,
      amount: fields.amount,
      updateId: fields.updateId,
    }
  }

  toJSON(): FleetShipsInfoJSON {
    return {
      ship: this.ship.toString(),
      amount: this.amount.toString(),
      updateId: this.updateId.toString(),
    }
  }

  static fromJSON(obj: FleetShipsInfoJSON): FleetShipsInfo {
    return new FleetShipsInfo({
      ship: new PublicKey(obj.ship),
      amount: new BN(obj.amount),
      updateId: new BN(obj.updateId),
    })
  }

  toEncodable() {
    return FleetShipsInfo.toEncodable(this)
  }
}
