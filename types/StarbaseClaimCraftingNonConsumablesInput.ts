import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseClaimCraftingNonConsumablesInputFields {
  /** the index of the recipe output */
  ingredientIndex: number
}

export interface StarbaseClaimCraftingNonConsumablesInputJSON {
  /** the index of the recipe output */
  ingredientIndex: number
}

/** Struct for data input to Claim Crafting Process Non-consumable inputs */
export class StarbaseClaimCraftingNonConsumablesInput {
  /** the index of the recipe output */
  readonly ingredientIndex: number

  constructor(fields: StarbaseClaimCraftingNonConsumablesInputFields) {
    this.ingredientIndex = fields.ingredientIndex
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u16("ingredientIndex")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseClaimCraftingNonConsumablesInput({
      ingredientIndex: obj.ingredientIndex,
    })
  }

  static toEncodable(fields: StarbaseClaimCraftingNonConsumablesInputFields) {
    return {
      ingredientIndex: fields.ingredientIndex,
    }
  }

  toJSON(): StarbaseClaimCraftingNonConsumablesInputJSON {
    return {
      ingredientIndex: this.ingredientIndex,
    }
  }

  static fromJSON(
    obj: StarbaseClaimCraftingNonConsumablesInputJSON
  ): StarbaseClaimCraftingNonConsumablesInput {
    return new StarbaseClaimCraftingNonConsumablesInput({
      ingredientIndex: obj.ingredientIndex,
    })
  }

  toEncodable() {
    return StarbaseClaimCraftingNonConsumablesInput.toEncodable(this)
  }
}
