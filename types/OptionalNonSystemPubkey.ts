import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionalNonSystemPubkeyFields {
  key: PublicKey
}

export interface OptionalNonSystemPubkeyJSON {
  key: string
}

/** A pubkey sized option that is none if set to the system program. */
export class OptionalNonSystemPubkey {
  readonly key: PublicKey

  constructor(fields: OptionalNonSystemPubkeyFields) {
    this.key = fields.key
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("key")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionalNonSystemPubkey({
      key: obj.key,
    })
  }

  static toEncodable(fields: OptionalNonSystemPubkeyFields) {
    return {
      key: fields.key,
    }
  }

  toJSON(): OptionalNonSystemPubkeyJSON {
    return {
      key: this.key.toString(),
    }
  }

  static fromJSON(obj: OptionalNonSystemPubkeyJSON): OptionalNonSystemPubkey {
    return new OptionalNonSystemPubkey({
      key: new PublicKey(obj.key),
    })
  }

  toEncodable() {
    return OptionalNonSystemPubkey.toEncodable(this)
  }
}
