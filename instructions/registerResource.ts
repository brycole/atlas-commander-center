import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterResourceArgs {
  input: types.RegisterResourceInputFields
}

export interface RegisterResourceAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The funder for the new resource */
  funder: PublicKey
  /** The [`Resource`] account */
  resource: PublicKey
  /** The Location address */
  location: PublicKey
  /** The [`MineItem`] account */
  mineItem: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.RegisterResourceInput.layout("input"),
])

export function registerResource(
  args: RegisterResourceArgs,
  accounts: RegisterResourceAccounts,
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
    { pubkey: accounts.resource, isSigner: false, isWritable: true },
    { pubkey: accounts.location, isSigner: false, isWritable: true },
    { pubkey: accounts.mineItem, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([87, 209, 164, 28, 6, 82, 232, 214])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.RegisterResourceInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
