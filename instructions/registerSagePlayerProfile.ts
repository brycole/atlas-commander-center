import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterSagePlayerProfileAccounts {
  /** The player permissions [`Profile`] */
  profile: PublicKey
  /** The funder for the new profile */
  funder: PublicKey
  /** The `SagePlayerProfile` account */
  sagePlayerProfile: PublicKey
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The Solana System program */
  systemProgram: PublicKey
}

export function registerSagePlayerProfile(
  accounts: RegisterSagePlayerProfileAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.profile, isSigner: false, isWritable: false },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.sagePlayerProfile, isSigner: false, isWritable: true },
    {
      pubkey: accounts.gameAccounts.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccounts.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([88, 142, 218, 149, 75, 77, 228, 156])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
