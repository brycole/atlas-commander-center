import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ActivateGameStateArgs {
  input: types.ManageGameInputFields
}

export interface ActivateGameStateAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The [`GameState`] account */
  gameState: PublicKey
}

export const layout = borsh.struct([types.ManageGameInput.layout("input")])

export function activateGameState(
  args: ActivateGameStateArgs,
  accounts: ActivateGameStateAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.gameAndProfile.key, isSigner: true, isWritable: false },
    {
      pubkey: accounts.gameAndProfile.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAndProfile.gameId,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.gameState, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([134, 227, 46, 21, 85, 120, 113, 131])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.ManageGameInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
