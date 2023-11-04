import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AddShipToFleetInputFields {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number | null
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface AddShipToFleetInputJSON {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number | null
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for that has `key_index` */
export class AddShipToFleetInput {
  /** Number of ships to add to the fleet */
  readonly shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  readonly shipEscrowIndex: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  readonly fleetShipInfoIndex: number | null
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: AddShipToFleetInputFields) {
    this.shipAmount = fields.shipAmount
    this.shipEscrowIndex = fields.shipEscrowIndex
    this.fleetShipInfoIndex = fields.fleetShipInfoIndex
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("shipAmount"),
        borsh.u32("shipEscrowIndex"),
        borsh.option(borsh.u32(), "fleetShipInfoIndex"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AddShipToFleetInput({
      shipAmount: obj.shipAmount,
      shipEscrowIndex: obj.shipEscrowIndex,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: AddShipToFleetInputFields) {
    return {
      shipAmount: fields.shipAmount,
      shipEscrowIndex: fields.shipEscrowIndex,
      fleetShipInfoIndex: fields.fleetShipInfoIndex,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): AddShipToFleetInputJSON {
    return {
      shipAmount: this.shipAmount,
      shipEscrowIndex: this.shipEscrowIndex,
      fleetShipInfoIndex: this.fleetShipInfoIndex,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: AddShipToFleetInputJSON): AddShipToFleetInput {
    return new AddShipToFleetInput({
      shipAmount: obj.shipAmount,
      shipEscrowIndex: obj.shipEscrowIndex,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return AddShipToFleetInput.toEncodable(this)
  }
}
