import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseDepositCraftingIngredientInputFields {
  /** the amount of ingredient to deposit */
  amount: BN
  /** the index of the recipe ingredient */
  ingredientIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseDepositCraftingIngredientInputJSON {
  /** the amount of ingredient to deposit */
  amount: string
  /** the index of the recipe ingredient */
  ingredientIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to deposit an ingredient */
export class StarbaseDepositCraftingIngredientInput {
  /** the amount of ingredient to deposit */
  readonly amount: BN
  /** the index of the recipe ingredient */
  readonly ingredientIndex: number
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseDepositCraftingIngredientInputFields) {
    this.amount = fields.amount
    this.ingredientIndex = fields.ingredientIndex
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("amount"),
        borsh.u16("ingredientIndex"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseDepositCraftingIngredientInput({
      amount: obj.amount,
      ingredientIndex: obj.ingredientIndex,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseDepositCraftingIngredientInputFields) {
    return {
      amount: fields.amount,
      ingredientIndex: fields.ingredientIndex,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseDepositCraftingIngredientInputJSON {
    return {
      amount: this.amount.toString(),
      ingredientIndex: this.ingredientIndex,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseDepositCraftingIngredientInputJSON
  ): StarbaseDepositCraftingIngredientInput {
    return new StarbaseDepositCraftingIngredientInput({
      amount: new BN(obj.amount),
      ingredientIndex: obj.ingredientIndex,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseDepositCraftingIngredientInput.toEncodable(this)
  }
}
