import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FleetsPointModifierFields {
  /** `FleetsPointModifier` Pubkey */
  pubkey: PublicKey
  /** `FleetsPointModifier` bump */
  bump: number
}

export interface FleetsPointModifierJSON {
  /** `FleetsPointModifier` Pubkey */
  pubkey: string
  /** `FleetsPointModifier` bump */
  bump: number
}

/** The fleets account registered as a modifier in the Points program */
export class FleetsPointModifier {
  /** `FleetsPointModifier` Pubkey */
  readonly pubkey: PublicKey
  /** `FleetsPointModifier` bump */
  readonly bump: number

  constructor(fields: FleetsPointModifierFields) {
    this.pubkey = fields.pubkey
    this.bump = fields.bump
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("pubkey"), borsh.u8("bump")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FleetsPointModifier({
      pubkey: obj.pubkey,
      bump: obj.bump,
    })
  }

  static toEncodable(fields: FleetsPointModifierFields) {
    return {
      pubkey: fields.pubkey,
      bump: fields.bump,
    }
  }

  toJSON(): FleetsPointModifierJSON {
    return {
      pubkey: this.pubkey.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: FleetsPointModifierJSON): FleetsPointModifier {
    return new FleetsPointModifier({
      pubkey: new PublicKey(obj.pubkey),
      bump: obj.bump,
    })
  }

  toEncodable() {
    return FleetsPointModifier.toEncodable(this)
  }
}
