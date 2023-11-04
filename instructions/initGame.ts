import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InitGameAccounts {
  /** The entity calling this instruction */
  signer: PublicKey
  /** The sector permissions [`Profile`] */
  profile: PublicKey
  /** The funder for the new game */
  funder: PublicKey
  /** The [`Game`] account */
  gameId: PublicKey
  /** The system program */
  systemProgram: PublicKey
}

export function initGame(
  accounts: InitGameAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.signer, isSigner: true, isWritable: true },
    { pubkey: accounts.profile, isSigner: false, isWritable: false },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.gameId, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([251, 46, 12, 208, 184, 148, 157, 73])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
