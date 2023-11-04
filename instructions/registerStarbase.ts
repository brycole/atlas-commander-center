import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterStarbaseArgs {
  input: types.RegisterStarbaseInputUnpackedFields
}

export interface RegisterStarbaseAccounts {
  /** The funder for the new star base */
  funder: PublicKey
  /** The [`Starbase`] account */
  starbase: PublicKey
  /** The [`Sector`] account */
  sector: PublicKey
  gameStateAndProfile: {
    gameAndProfile: {
      /** The key authorized for this instruction */
      key: PublicKey
      /** The [`Profile`] account */
      profile: PublicKey
      /** The [`Game`] account */
      gameId: PublicKey
    }
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.RegisterStarbaseInputUnpacked.layout("input"),
])

export function registerStarbase(
  args: RegisterStarbaseArgs,
  accounts: RegisterStarbaseAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.starbase, isSigner: false, isWritable: true },
    { pubkey: accounts.sector, isSigner: false, isWritable: false },
    {
      pubkey: accounts.gameStateAndProfile.gameAndProfile.key,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: accounts.gameStateAndProfile.gameAndProfile.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameStateAndProfile.gameAndProfile.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameStateAndProfile.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([105, 33, 36, 138, 165, 181, 51, 57])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.RegisterStarbaseInputUnpacked.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
