import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SyncResourceAccounts {
  /** The [`MineItem`] account */
  mineItem: PublicKey
  /** The [`Resource`] account */
  resource: PublicKey
}

export function syncResource(
  accounts: SyncResourceAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.mineItem, isSigner: false, isWritable: false },
    { pubkey: accounts.resource, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([64, 150, 217, 8, 252, 171, 156, 36])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
