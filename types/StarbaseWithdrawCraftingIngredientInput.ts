import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseWithdrawCraftingIngredientInputFields {
  /** the amount of ingredient to withdraw */
  amount: BN
  /** the index of the recipe ingredient */
  ingredientIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseWithdrawCraftingIngredientInputJSON {
  /** the amount of ingredient to withdraw */
  amount: string
  /** the index of the recipe ingredient */
  ingredientIndex: number
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to withdraw an ingredient */
export class StarbaseWithdrawCraftingIngredientInput {
  /** the amount of ingredient to withdraw */
  readonly amount: BN
  /** the index of the recipe ingredient */
  readonly ingredientIndex: number
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseWithdrawCraftingIngredientInputFields) {
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
    return new StarbaseWithdrawCraftingIngredientInput({
      amount: obj.amount,
      ingredientIndex: obj.ingredientIndex,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseWithdrawCraftingIngredientInputFields) {
    return {
      amount: fields.amount,
      ingredientIndex: fields.ingredientIndex,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseWithdrawCraftingIngredientInputJSON {
    return {
      amount: this.amount.toString(),
      ingredientIndex: this.ingredientIndex,
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseWithdrawCraftingIngredientInputJSON
  ): StarbaseWithdrawCraftingIngredientInput {
    return new StarbaseWithdrawCraftingIngredientInput({
      amount: new BN(obj.amount),
      ingredientIndex: obj.ingredientIndex,
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseWithdrawCraftingIngredientInput.toEncodable(this)
  }
}
