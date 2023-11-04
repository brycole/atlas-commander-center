import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MoveSubwarpFields {
  /** The sector the fleet is coming from */
  fromSector: Array<BN>
  /** The sector the fleet is going to */
  toSector: Array<BN>
  /** The sector the fleet is currently in */
  currentSector: Array<BN>
  /** When the fleet started subwarp */
  departureTime: BN
  /** When the fleet will finish subwarp */
  arrivalTime: BN
  /** The fuel cost of the subwarp */
  fuelExpenditure: BN
  /** The last update time */
  lastUpdate: BN
}

export interface MoveSubwarpJSON {
  /** The sector the fleet is coming from */
  fromSector: Array<string>
  /** The sector the fleet is going to */
  toSector: Array<string>
  /** The sector the fleet is currently in */
  currentSector: Array<string>
  /** When the fleet started subwarp */
  departureTime: string
  /** When the fleet will finish subwarp */
  arrivalTime: string
  /** The fuel cost of the subwarp */
  fuelExpenditure: string
  /** The last update time */
  lastUpdate: string
}

/** The data for the [`FleetStateData::MoveSubwarp`] state */
export class MoveSubwarp {
  /** The sector the fleet is coming from */
  readonly fromSector: Array<BN>
  /** The sector the fleet is going to */
  readonly toSector: Array<BN>
  /** The sector the fleet is currently in */
  readonly currentSector: Array<BN>
  /** When the fleet started subwarp */
  readonly departureTime: BN
  /** When the fleet will finish subwarp */
  readonly arrivalTime: BN
  /** The fuel cost of the subwarp */
  readonly fuelExpenditure: BN
  /** The last update time */
  readonly lastUpdate: BN

  constructor(fields: MoveSubwarpFields) {
    this.fromSector = fields.fromSector
    this.toSector = fields.toSector
    this.currentSector = fields.currentSector
    this.departureTime = fields.departureTime
    this.arrivalTime = fields.arrivalTime
    this.fuelExpenditure = fields.fuelExpenditure
    this.lastUpdate = fields.lastUpdate
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.i64(), 2, "fromSector"),
        borsh.array(borsh.i64(), 2, "toSector"),
        borsh.array(borsh.i64(), 2, "currentSector"),
        borsh.i64("departureTime"),
        borsh.i64("arrivalTime"),
        borsh.u64("fuelExpenditure"),
        borsh.i64("lastUpdate"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MoveSubwarp({
      fromSector: obj.fromSector,
      toSector: obj.toSector,
      currentSector: obj.currentSector,
      departureTime: obj.departureTime,
      arrivalTime: obj.arrivalTime,
      fuelExpenditure: obj.fuelExpenditure,
      lastUpdate: obj.lastUpdate,
    })
  }

  static toEncodable(fields: MoveSubwarpFields) {
    return {
      fromSector: fields.fromSector,
      toSector: fields.toSector,
      currentSector: fields.currentSector,
      departureTime: fields.departureTime,
      arrivalTime: fields.arrivalTime,
      fuelExpenditure: fields.fuelExpenditure,
      lastUpdate: fields.lastUpdate,
    }
  }

  toJSON(): MoveSubwarpJSON {
    return {
      fromSector: this.fromSector.map((item) => item.toString()),
      toSector: this.toSector.map((item) => item.toString()),
      currentSector: this.currentSector.map((item) => item.toString()),
      departureTime: this.departureTime.toString(),
      arrivalTime: this.arrivalTime.toString(),
      fuelExpenditure: this.fuelExpenditure.toString(),
      lastUpdate: this.lastUpdate.toString(),
    }
  }

  static fromJSON(obj: MoveSubwarpJSON): MoveSubwarp {
    return new MoveSubwarp({
      fromSector: obj.fromSector.map((item) => new BN(item)),
      toSector: obj.toSector.map((item) => new BN(item)),
      currentSector: obj.currentSector.map((item) => new BN(item)),
      departureTime: new BN(obj.departureTime),
      arrivalTime: new BN(obj.arrivalTime),
      fuelExpenditure: new BN(obj.fuelExpenditure),
      lastUpdate: new BN(obj.lastUpdate),
    })
  }

  toEncodable() {
    return MoveSubwarp.toEncodable(this)
  }
}
