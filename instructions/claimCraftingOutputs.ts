import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ClaimCraftingOutputsArgs {
  input: types.StarbaseClaimCraftingOutputInputFields
}

export interface ClaimCraftingOutputsAccounts {
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The [`CraftingInstance`] account */
  craftingInstance: PublicKey
  /** The [`CraftingProcess`] account */
  craftingProcess: PublicKey
  /** The crafting [`Recipe`] */
  craftingRecipe: PublicKey
  /** The craftable item */
  craftableItem: PublicKey
  /** The destination cargo pod account */
  cargoPodTo: PublicKey
  /** The Cargo Type Account */
  cargoType: PublicKey
  /** The cargo stats definition account */
  cargoStatsDefinition: PublicKey
  /** The source account of the tokens - owner should be `craftable_item` */
  tokenFrom: PublicKey
  /** The destination account of the tokens - owner should be `cargo_pod_to` */
  tokenTo: PublicKey
  /** The Crafting Program */
  craftingProgram: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** The [Token] program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([
  types.StarbaseClaimCraftingOutputInput.layout("input"),
])

export function claimCraftingOutputs(
  args: ClaimCraftingOutputsArgs,
  accounts: ClaimCraftingOutputsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.craftingInstance, isSigner: false, isWritable: false },
    { pubkey: accounts.craftingProcess, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingRecipe, isSigner: false, isWritable: false },
    { pubkey: accounts.craftableItem, isSigner: false, isWritable: false },
    { pubkey: accounts.cargoPodTo, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([215, 71, 59, 28, 156, 93, 188, 255])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.StarbaseClaimCraftingOutputInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
