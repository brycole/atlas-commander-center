import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CraftingFields {
  /** The crafting domain account */
  domain: PublicKey
}

export interface CraftingJSON {
  /** The crafting domain account */
  domain: string
}

/** Variables for the Crafting program */
export class Crafting {
  /** The crafting domain account */
  readonly domain: PublicKey

  constructor(fields: CraftingFields) {
    this.domain = fields.domain
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("domain")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Crafting({
      domain: obj.domain,
    })
  }

  static toEncodable(fields: CraftingFields) {
    return {
      domain: fields.domain,
    }
  }

  toJSON(): CraftingJSON {
    return {
      domain: this.domain.toString(),
    }
  }

  static fromJSON(obj: CraftingJSON): Crafting {
    return new Crafting({
      domain: new PublicKey(obj.domain),
    })
  }

  toEncodable() {
    return Crafting.toEncodable(this)
  }
}
