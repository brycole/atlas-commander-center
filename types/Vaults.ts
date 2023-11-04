import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VaultsFields {
  /** ATLAS token mint */
  atlas: PublicKey
  /** POLIS token mint */
  polis: PublicKey
}

export interface VaultsJSON {
  /** ATLAS token mint */
  atlas: string
  /** POLIS token mint */
  polis: string
}

/** Token vaults */
export class Vaults {
  /** ATLAS token mint */
  readonly atlas: PublicKey
  /** POLIS token mint */
  readonly polis: PublicKey

  constructor(fields: VaultsFields) {
    this.atlas = fields.atlas
    this.polis = fields.polis
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("atlas"), borsh.publicKey("polis")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Vaults({
      atlas: obj.atlas,
      polis: obj.polis,
    })
  }

  static toEncodable(fields: VaultsFields) {
    return {
      atlas: fields.atlas,
      polis: fields.polis,
    }
  }

  toJSON(): VaultsJSON {
    return {
      atlas: this.atlas.toString(),
      polis: this.polis.toString(),
    }
  }

  static fromJSON(obj: VaultsJSON): Vaults {
    return new Vaults({
      atlas: new PublicKey(obj.atlas),
      polis: new PublicKey(obj.polis),
    })
  }

  toEncodable() {
    return Vaults.toEncodable(this)
  }
}
