import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateStarbaseArgs {
  input: types.UpdateStarbaseInputFields
}

export interface UpdateStarbaseAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The funder for the new game */
  funder: PublicKey
  /** The [`Starbase`] account */
  starbase: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.UpdateStarbaseInput.layout("input")])

export function updateStarbase(
  args: UpdateStarbaseArgs,
  accounts: UpdateStarbaseAccounts,
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
      isWritable: false,
    },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.starbase, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([78, 146, 104, 166, 111, 146, 95, 28])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdateStarbaseInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
