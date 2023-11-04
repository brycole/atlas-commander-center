import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeregisterMineItemArgs {
  input: types.KeyIndexInputFields
}

export interface DeregisterMineItemAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** Where the closing funds go. */
  fundsTo: PublicKey
  /** The [`MineItem`] account */
  mineItem: PublicKey
}

export const layout = borsh.struct([types.KeyIndexInput.layout("input")])

export function deregisterMineItem(
  args: DeregisterMineItemArgs,
  accounts: DeregisterMineItemAccounts,
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
    { pubkey: accounts.mineItem, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([21, 186, 168, 200, 84, 195, 41, 73])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.KeyIndexInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
