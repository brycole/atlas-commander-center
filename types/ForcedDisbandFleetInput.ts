import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ForcedDisbandFleetInputFields {
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
}

export interface ForcedDisbandFleetInputJSON {
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  fleetShipInfoIndex: number
}

/** Struct for data input for that has `key_index` */
export class ForcedDisbandFleetInput {
  /** Index of `FleetShipsInfo` in remaining data of `FleetShips` */
  readonly fleetShipInfoIndex: number

  constructor(fields: ForcedDisbandFleetInputFields) {
    this.fleetShipInfoIndex = fields.fleetShipInfoIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u32("fleetShipInfoIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ForcedDisbandFleetInput({
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
    })
  }

  static toEncodable(fields: ForcedDisbandFleetInputFields) {
    return {
      fleetShipInfoIndex: fields.fleetShipInfoIndex,
    }
  }

  toJSON(): ForcedDisbandFleetInputJSON {
    return {
      fleetShipInfoIndex: this.fleetShipInfoIndex,
    }
  }

  static fromJSON(obj: ForcedDisbandFleetInputJSON): ForcedDisbandFleetInput {
    return new ForcedDisbandFleetInput({
      fleetShipInfoIndex: obj.fleetShipInfoIndex,
    })
  }

  toEncodable() {
    return ForcedDisbandFleetInput.toEncodable(this)
  }
}
