import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AddConnectionArgs {
  subCoordinates1: Array<BN>
  flags1: number
  subCoordinates2: Array<BN>
  flags2: number
  keyIndex: number
}

export interface AddConnectionAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The funder for adding the connection */
  funder: PublicKey
  /** The first connected sector */
  sector1: PublicKey
  /** The second connected sector */
  sector2: PublicKey
  /** The system program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.i64(), 2, "subCoordinates1"),
  borsh.u8("flags1"),
  borsh.array(borsh.i64(), 2, "subCoordinates2"),
  borsh.u8("flags2"),
  borsh.u16("keyIndex"),
])

export function addConnection(
  args: AddConnectionArgs,
  accounts: AddConnectionAccounts,
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
    { pubkey: accounts.sector1, isSigner: false, isWritable: true },
    { pubkey: accounts.sector2, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([40, 6, 69, 0, 230, 150, 215, 41])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      subCoordinates1: args.subCoordinates1,
      flags1: args.flags1,
      subCoordinates2: args.subCoordinates2,
      flags2: args.flags2,
      keyIndex: args.keyIndex,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
