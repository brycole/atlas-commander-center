import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MintsFields {
  /** ATLAS token mint */
  atlas: PublicKey
  /** POLIS token mint */
  polis: PublicKey
  /** ammunition */
  ammo: PublicKey
  /** food */
  food: PublicKey
  /** fuel */
  fuel: PublicKey
  /** repair kit */
  repairKit: PublicKey
}

export interface MintsJSON {
  /** ATLAS token mint */
  atlas: string
  /** POLIS token mint */
  polis: string
  /** ammunition */
  ammo: string
  /** food */
  food: string
  /** fuel */
  fuel: string
  /** repair kit */
  repairKit: string
}

/** Token mints */
export class Mints {
  /** ATLAS token mint */
  readonly atlas: PublicKey
  /** POLIS token mint */
  readonly polis: PublicKey
  /** ammunition */
  readonly ammo: PublicKey
  /** food */
  readonly food: PublicKey
  /** fuel */
  readonly fuel: PublicKey
  /** repair kit */
  readonly repairKit: PublicKey

  constructor(fields: MintsFields) {
    this.atlas = fields.atlas
    this.polis = fields.polis
    this.ammo = fields.ammo
    this.food = fields.food
    this.fuel = fields.fuel
    this.repairKit = fields.repairKit
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("atlas"),
        borsh.publicKey("polis"),
        borsh.publicKey("ammo"),
        borsh.publicKey("food"),
        borsh.publicKey("fuel"),
        borsh.publicKey("repairKit"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Mints({
      atlas: obj.atlas,
      polis: obj.polis,
      ammo: obj.ammo,
      food: obj.food,
      fuel: obj.fuel,
      repairKit: obj.repairKit,
    })
  }

  static toEncodable(fields: MintsFields) {
    return {
      atlas: fields.atlas,
      polis: fields.polis,
      ammo: fields.ammo,
      food: fields.food,
      fuel: fields.fuel,
      repairKit: fields.repairKit,
    }
  }

  toJSON(): MintsJSON {
    return {
      atlas: this.atlas.toString(),
      polis: this.polis.toString(),
      ammo: this.ammo.toString(),
      food: this.food.toString(),
      fuel: this.fuel.toString(),
      repairKit: this.repairKit.toString(),
    }
  }

  static fromJSON(obj: MintsJSON): Mints {
    return new Mints({
      atlas: new PublicKey(obj.atlas),
      polis: new PublicKey(obj.polis),
      ammo: new PublicKey(obj.ammo),
      food: new PublicKey(obj.food),
      fuel: new PublicKey(obj.fuel),
      repairKit: new PublicKey(obj.repairKit),
    })
  }

  toEncodable() {
    return Mints.toEncodable(this)
  }
}
