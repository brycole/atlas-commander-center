import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterStarbasePlayerAccounts {
  /** The funder -- pays account rent */
  funder: PublicKey
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The [`SagePlayerProfile`] account */
  sagePlayerProfile: PublicKey
  /** The faction that the player belongs to. */
  profileFaction: PublicKey
  /** The [`Starbase`] account */
  starbase: PublicKey
  /** The [`StarbasePlayer`] account to initialize */
  starbasePlayer: PublicKey
  /** The system program */
  systemProgram: PublicKey
}

export function registerStarbasePlayer(
  accounts: RegisterStarbasePlayerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
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
    { pubkey: accounts.sagePlayerProfile, isSigner: false, isWritable: false },
    { pubkey: accounts.profileFaction, isSigner: false, isWritable: false },
    { pubkey: accounts.starbase, isSigner: false, isWritable: false },
    { pubkey: accounts.starbasePlayer, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([60, 18, 158, 19, 208, 147, 83, 226])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
