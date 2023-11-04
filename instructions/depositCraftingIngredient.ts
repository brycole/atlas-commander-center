import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DepositCraftingIngredientArgs {
  input: types.StarbaseDepositCraftingIngredientInputFields
}

export interface DepositCraftingIngredientAccounts {
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The [`CraftingInstance`] account */
  craftingInstance: PublicKey
  /** The [`CraftingFacility`](crafting::CraftingFacility) account */
  craftingFacility: PublicKey
  /** The crafting process account */
  craftingProcess: PublicKey
  /** The source cargo pod account */
  cargoPodFrom: PublicKey
  /** The crafting recipe */
  craftingRecipe: PublicKey
  /** The Cargo Type Account */
  cargoType: PublicKey
  /** The cargo stats definition account */
  cargoStatsDefinition: PublicKey
  gameAccountsAndProfile: {
    gameAndProfileAndFaction: {
      /** The key authorized for this instruction */
      key: PublicKey
      /** The [`Profile`] account */
      profile: PublicKey
      /** The faction that the profile belongs to. */
      profileFaction: PublicKey
      /** The [`Game`] account */
      gameId: PublicKey
    }
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The source account of the tokens - owner should be `cargo_pod_from` */
  tokenFrom: PublicKey
  /** The destination account of the tokens - owner should be `crafting_process` */
  tokenTo: PublicKey
  /** The Crafting Program */
  craftingProgram: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** The [Token] program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([
  types.StarbaseDepositCraftingIngredientInput.layout("input"),
])

export function depositCraftingIngredient(
  args: DepositCraftingIngredientArgs,
  accounts: DepositCraftingIngredientAccounts,
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
    { pubkey: accounts.craftingFacility, isSigner: false, isWritable: false },
    { pubkey: accounts.craftingProcess, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoPodFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingRecipe, isSigner: false, isWritable: false },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.key,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profileFaction,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([32, 35, 145, 213, 56, 255, 209, 156])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.StarbaseDepositCraftingIngredientInput.toEncodable(
        args.input
      ),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
