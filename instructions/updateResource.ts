import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateResourceArgs {
  input: types.UpdateResourceInputFields
}

export interface UpdateResourceAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The [`MineItem`] account */
  mineItem: PublicKey
  /** The [`Resource`] account */
  resource: PublicKey
}

export const layout = borsh.struct([types.UpdateResourceInput.layout("input")])

export function updateResource(
  args: UpdateResourceArgs,
  accounts: UpdateResourceAccounts,
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
    { pubkey: accounts.mineItem, isSigner: false, isWritable: false },
    { pubkey: accounts.resource, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([240, 208, 156, 86, 230, 216, 1, 100])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdateResourceInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
