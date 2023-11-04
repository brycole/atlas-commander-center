import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CargoFields {
  /** The cargo stats definition account */
  statsDefinition: PublicKey
}

export interface CargoJSON {
  /** The cargo stats definition account */
  statsDefinition: string
}

/** Variables for the Cargo program */
export class Cargo {
  /** The cargo stats definition account */
  readonly statsDefinition: PublicKey

  constructor(fields: CargoFields) {
    this.statsDefinition = fields.statsDefinition
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("statsDefinition")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Cargo({
      statsDefinition: obj.statsDefinition,
    })
  }

  static toEncodable(fields: CargoFields) {
    return {
      statsDefinition: fields.statsDefinition,
    }
  }

  toJSON(): CargoJSON {
    return {
      statsDefinition: this.statsDefinition.toString(),
    }
  }

  static fromJSON(obj: CargoJSON): Cargo {
    return new Cargo({
      statsDefinition: new PublicKey(obj.statsDefinition),
    })
  }

  toEncodable() {
    return Cargo.toEncodable(this)
  }
}
