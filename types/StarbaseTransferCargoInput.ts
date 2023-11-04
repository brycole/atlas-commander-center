import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseTransferCargoInputFields {
  /** cargo amount */
  amount: BN
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseTransferCargoInputJSON {
  /** cargo amount */
  amount: string
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to `DepositCargoToGame` */
export class StarbaseTransferCargoInput {
  /** cargo amount */
  readonly amount: BN
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseTransferCargoInputFields) {
    this.amount = fields.amount
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount"), borsh.u16("keyIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseTransferCargoInput({
      amount: obj.amount,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseTransferCargoInputFields) {
    return {
      amount: fields.amount,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseTransferCargoInputJSON {
    return {
      amount: this.amount.toString(),
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseTransferCargoInputJSON
  ): StarbaseTransferCargoInput {
    return new StarbaseTransferCargoInput({
      amount: new BN(obj.amount),
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseTransferCargoInput.toEncodable(this)
  }
}
