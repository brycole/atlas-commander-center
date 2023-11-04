import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CancelCraftingProcessArgs {
  input: types.StarbaseCancelCraftingProcessInputFields
}

export interface CancelCraftingProcessAccounts {
  /** The funds_to - receives rent refund */
  fundsTo: PublicKey
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The [`CraftingInstance`] account to cancel */
  craftingInstance: PublicKey
  /** The crafting process account */
  craftingProcess: PublicKey
  /** The `CraftingFacility` account */
  craftingFacility: PublicKey
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
  /** The Crafting Program */
  craftingProgram: PublicKey
}

export const layout = borsh.struct([
  types.StarbaseCancelCraftingProcessInput.layout("input"),
])

export function cancelCraftingProcess(
  args: CancelCraftingProcessArgs,
  accounts: CancelCraftingProcessAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.craftingInstance, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingProcess, isSigner: false, isWritable: true },
    { pubkey: accounts.craftingFacility, isSigner: false, isWritable: true },
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
    { pubkey: accounts.craftingProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([215, 30, 129, 128, 91, 231, 249, 78])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.StarbaseCancelCraftingProcessInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
