import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SyncStarbasePlayerAccounts {
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
}

export function syncStarbasePlayer(
  accounts: SyncStarbasePlayerAccounts,
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
      isWritable: true,
    },
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
  ]
  const identifier = Buffer.from([120, 94, 164, 216, 167, 59, 3, 204])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
