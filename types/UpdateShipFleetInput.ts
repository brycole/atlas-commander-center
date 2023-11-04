import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateShipFleetInputFields {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
}

export interface UpdateShipFleetInputJSON {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
}

/** Struct for data input for that has `key_index` */
export class UpdateShipFleetInput {
  /** Number of ships to add to the fleet */
  readonly shipAmount: number
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  readonly fleetShipInfoIndex: number

  constructor(fields: UpdateShipFleetInputFields) {
    this.shipAmount = fields.shipAmount
    this.fleetShipInfoIndex = fields.fleetShipInfoIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("shipAmount"), borsh.u32("fleetShipInfoIndex")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateShipFleetInput({
      shipAmount: obj.shipAmount,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
    })
  }

  static toEncodable(fields: UpdateShipFleetInputFields) {
    return {
      shipAmount: fields.shipAmount,
      fleetShipInfoIndex: fields.fleetShipInfoIndex,
    }
  }

  toJSON(): UpdateShipFleetInputJSON {
    return {
      shipAmount: this.shipAmount,
      fleetShipInfoIndex: this.fleetShipInfoIndex,
    }
  }

  static fromJSON(obj: UpdateShipFleetInputJSON): UpdateShipFleetInput {
    return new UpdateShipFleetInput({
      shipAmount: obj.shipAmount,
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
    })
  }

  toEncodable() {
    return UpdateShipFleetInput.toEncodable(this)
  }
}
