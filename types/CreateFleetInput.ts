import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CreateFleetInputFields {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** the fleet label */
  fleetLabel: Array<number>
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
  /** cargo hold seeds */
  cargoHoldSeeds: Array<number>
  /** fuel tank seeds */
  fuelTankSeeds: Array<number>
  /** ammo bank seeds */
  ammoBankSeeds: Array<number>
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface CreateFleetInputJSON {
  /** Number of ships to add to the fleet */
  shipAmount: number
  /** the fleet label */
  fleetLabel: Array<number>
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  shipEscrowIndex: number
  /** cargo hold seeds */
  cargoHoldSeeds: Array<number>
  /** fuel tank seeds */
  fuelTankSeeds: Array<number>
  /** ammo bank seeds */
  ammoBankSeeds: Array<number>
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input for that has `key_index` */
export class CreateFleetInput {
  /** Number of ships to add to the fleet */
  readonly shipAmount: number
  /** the fleet label */
  readonly fleetLabel: Array<number>
  /** Index of `WrappedShipEscrow` in remaining data of `StarbasePlayer` */
  readonly shipEscrowIndex: number
  /** cargo hold seeds */
  readonly cargoHoldSeeds: Array<number>
  /** fuel tank seeds */
  readonly fuelTankSeeds: Array<number>
  /** ammo bank seeds */
  readonly ammoBankSeeds: Array<number>
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: CreateFleetInputFields) {
    this.shipAmount = fields.shipAmount
    this.fleetLabel = fields.fleetLabel
    this.shipEscrowIndex = fields.shipEscrowIndex
    this.cargoHoldSeeds = fields.cargoHoldSeeds
    this.fuelTankSeeds = fields.fuelTankSeeds
    this.ammoBankSeeds = fields.ammoBankSeeds
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("shipAmount"),
        borsh.array(borsh.u8(), 32, "fleetLabel"),
        borsh.u32("shipEscrowIndex"),
        borsh.array(borsh.u8(), 32, "cargoHoldSeeds"),
        borsh.array(borsh.u8(), 32, "fuelTankSeeds"),
        borsh.array(borsh.u8(), 32, "ammoBankSeeds"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CreateFleetInput({
      shipAmount: obj.shipAmount,
      fleetLabel: obj.fleetLabel,
      shipEscrowIndex: obj.shipEscrowIndex,
      cargoHoldSeeds: obj.cargoHoldSeeds,
      fuelTankSeeds: obj.fuelTankSeeds,
      ammoBankSeeds: obj.ammoBankSeeds,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: CreateFleetInputFields) {
    return {
      shipAmount: fields.shipAmount,
      fleetLabel: fields.fleetLabel,
      shipEscrowIndex: fields.shipEscrowIndex,
      cargoHoldSeeds: fields.cargoHoldSeeds,
      fuelTankSeeds: fields.fuelTankSeeds,
      ammoBankSeeds: fields.ammoBankSeeds,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): CreateFleetInputJSON {
    return {
      shipAmount: this.shipAmount,
      fleetLabel: this.fleetLabel,
      shipEscrowIndex: this.shipEscrowIndex,
      cargoHoldSeeds: this.cargoHoldSeeds,
      fuelTankSeeds: this.fuelTankSeeds,
      ammoBankSeeds: this.ammoBankSeeds,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(obj: CreateFleetInputJSON): CreateFleetInput {
    return new CreateFleetInput({
      shipAmount: obj.shipAmount,
      fleetLabel: obj.fleetLabel,
      shipEscrowIndex: obj.shipEscrowIndex,
      cargoHoldSeeds: obj.cargoHoldSeeds,
      fuelTankSeeds: obj.fuelTankSeeds,
      ammoBankSeeds: obj.ammoBankSeeds,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return CreateFleetInput.toEncodable(this)
  }
}
