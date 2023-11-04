import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeregisterResourceArgs {
  input: types.KeyIndexInputFields
}

export interface DeregisterResourceAccounts {
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
  /** The [`Resource`] account */
  resource: PublicKey
  /** The Location address */
  location: PublicKey
}

export const layout = borsh.struct([types.KeyIndexInput.layout("input")])

export function deregisterResource(
  args: DeregisterResourceArgs,
  accounts: DeregisterResourceAccounts,
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
    { pubkey: accounts.resource, isSigner: false, isWritable: true },
    { pubkey: accounts.location, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([57, 140, 148, 246, 8, 89, 23, 34])
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
