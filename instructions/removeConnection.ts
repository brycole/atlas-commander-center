import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RemoveConnectionArgs {
  sector1Index: number
  sector2Index: number
  keyIndex: number
}

export interface RemoveConnectionAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** Where the rent refund funds from the connections go to. */
  fundsTo: PublicKey
  /** The first sector to remove from */
  sector1: PublicKey
  /** The second sector to remove from */
  sector2: PublicKey
  /** The system program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u16("sector1Index"),
  borsh.u16("sector2Index"),
  borsh.u16("keyIndex"),
])

export function removeConnection(
  args: RemoveConnectionArgs,
  accounts: RemoveConnectionAccounts,
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
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    { pubkey: accounts.sector1, isSigner: false, isWritable: true },
    { pubkey: accounts.sector2, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([200, 145, 119, 103, 85, 190, 120, 138])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      sector1Index: args.sector1Index,
      sector2Index: args.sector2Index,
      keyIndex: args.keyIndex,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
