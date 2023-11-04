import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseClaimCraftingOutputInputFields {
  /** the index of the recipe output */
  ingredientIndex: number
}

export interface StarbaseClaimCraftingOutputInputJSON {
  /** the index of the recipe output */
  ingredientIndex: number
}

/** Struct for data input to close a `CraftingProcess` */
export class StarbaseClaimCraftingOutputInput {
  /** the index of the recipe output */
  readonly ingredientIndex: number

  constructor(fields: StarbaseClaimCraftingOutputInputFields) {
    this.ingredientIndex = fields.ingredientIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("ingredientIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseClaimCraftingOutputInput({
      ingredientIndex: obj.ingredientIndex,
    })
  }

  static toEncodable(fields: StarbaseClaimCraftingOutputInputFields) {
    return {
      ingredientIndex: fields.ingredientIndex,
    }
  }

  toJSON(): StarbaseClaimCraftingOutputInputJSON {
    return {
      ingredientIndex: this.ingredientIndex,
    }
  }

  static fromJSON(
    obj: StarbaseClaimCraftingOutputInputJSON
  ): StarbaseClaimCraftingOutputInput {
    return new StarbaseClaimCraftingOutputInput({
      ingredientIndex: obj.ingredientIndex,
    })
  }

  toEncodable() {
    return StarbaseClaimCraftingOutputInput.toEncodable(this)
  }
}
