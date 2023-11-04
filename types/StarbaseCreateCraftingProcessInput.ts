import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseCreateCraftingProcessInputFields {
  /** crafting id */
  craftingId: BN
  /** the index of the recipe's category */
  recipeCategoryIndex: number
  /** quantity of outputs to craft */
  quantity: BN
  /** number of crew members to use for this crafting process */
  numCrew: BN
  /** the index of the key in the player profile */
  keyIndex: number
}

export interface StarbaseCreateCraftingProcessInputJSON {
  /** crafting id */
  craftingId: string
  /** the index of the recipe's category */
  recipeCategoryIndex: number
  /** quantity of outputs to craft */
  quantity: string
  /** number of crew members to use for this crafting process */
  numCrew: string
  /** the index of the key in the player profile */
  keyIndex: number
}

/** Struct for data input to create a `CraftingProcess` */
export class StarbaseCreateCraftingProcessInput {
  /** crafting id */
  readonly craftingId: BN
  /** the index of the recipe's category */
  readonly recipeCategoryIndex: number
  /** quantity of outputs to craft */
  readonly quantity: BN
  /** number of crew members to use for this crafting process */
  readonly numCrew: BN
  /** the index of the key in the player profile */
  readonly keyIndex: number

  constructor(fields: StarbaseCreateCraftingProcessInputFields) {
    this.craftingId = fields.craftingId
    this.recipeCategoryIndex = fields.recipeCategoryIndex
    this.quantity = fields.quantity
    this.numCrew = fields.numCrew
    this.keyIndex = fields.keyIndex
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("craftingId"),
        borsh.u16("recipeCategoryIndex"),
        borsh.u64("quantity"),
        borsh.u64("numCrew"),
        borsh.u16("keyIndex"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseCreateCraftingProcessInput({
      craftingId: obj.craftingId,
      recipeCategoryIndex: obj.recipeCategoryIndex,
      quantity: obj.quantity,
      numCrew: obj.numCrew,
      keyIndex: obj.keyIndex,
    })
  }

  static toEncodable(fields: StarbaseCreateCraftingProcessInputFields) {
    return {
      craftingId: fields.craftingId,
      recipeCategoryIndex: fields.recipeCategoryIndex,
      quantity: fields.quantity,
      numCrew: fields.numCrew,
      keyIndex: fields.keyIndex,
    }
  }

  toJSON(): StarbaseCreateCraftingProcessInputJSON {
    return {
      craftingId: this.craftingId.toString(),
      recipeCategoryIndex: this.recipeCategoryIndex,
      quantity: this.quantity.toString(),
      numCrew: this.numCrew.toString(),
      keyIndex: this.keyIndex,
    }
  }

  static fromJSON(
    obj: StarbaseCreateCraftingProcessInputJSON
  ): StarbaseCreateCraftingProcessInput {
    return new StarbaseCreateCraftingProcessInput({
      craftingId: new BN(obj.craftingId),
      recipeCategoryIndex: obj.recipeCategoryIndex,
      quantity: new BN(obj.quantity),
      numCrew: new BN(obj.numCrew),
      keyIndex: obj.keyIndex,
    })
  }

  toEncodable() {
    return StarbaseCreateCraftingProcessInput.toEncodable(this)
  }
}
