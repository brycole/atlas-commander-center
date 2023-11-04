import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DisbandedFleetToEscrowInputFields {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number | null
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface DisbandedFleetToEscrowInputJSON {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number | null
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for that has `key_index` */
export class DisbandedFleetToEscrowInput {
  /** Number of ships to add to the fleet */
  readonly shipAmount: number
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  readonly shipEscrowIndex: number | null
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  readonly fleetShipInfoIndex: number
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: DisbandedFleetToEscrowInputFields) {
    this.shipAmount = fields.shipAmount
    this.shipEscrowIndex = fields.shipEscrowIndex
    this.fleetShipInfoIndex = fields.fleetShipInfoIndex
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u16("shipAmount"),
        borsh.option(borsh.u32(), "shipEscrowIndex"),
        borsh.u32("fleetShipInfoIndex"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DisbandedFleetToEscrowInput({
      shipAmount: obj.shipAmount,
      shipEscrowIndex: obj.shipEscrowIndex,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: DisbandedFleetToEscrowInputFields) {
    return {
      shipAmount: fields.shipAmount,
      shipEscrowIndex: fields.shipEscrowIndex,
      fleetShipInfoIndex: fields.fleetShipInfoIndex,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): DisbandedFleetToEscrowInputJSON {
    return {
      shipAmount: this.shipAmount,
      shipEscrowIndex: this.shipEscrowIndex,
      fleetShipInfoIndex: this.fleetShipInfoIndex,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: DisbandedFleetToEscrowInputJSON
  ): DisbandedFleetToEscrowInput {
    return new DisbandedFleetToEscrowInput({
      shipAmount: obj.shipAmount,
      shipEscrowIndex: obj.shipEscrowIndex,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return DisbandedFleetToEscrowInput.toEncodable(this)
  }
}
