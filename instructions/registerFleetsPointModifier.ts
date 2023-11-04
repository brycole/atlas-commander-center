import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterFleetsPointModifierArgs {
  input: types.RegisterFleetsPointsModifierInputFields
}

export interface RegisterFleetsPointModifierAccounts {
  /** The key authorized for the cpi points instruction */
  key: PublicKey
  /** The points permissions [`Profile`](player_profile::state::Profile) */
  profile: PublicKey
  /** The funder - pays for account rent */
  funder: PublicKey
  /** The `PointCategory` */
  pointsCategory: PublicKey
  /** The `PointsModifier` account to be inited in Points CPI */
  pointsModifierAccount: PublicKey
  /** The points program */
  pointsProgram: PublicKey
  /** The [`GameState`] account */
  gameState: PublicKey
  /** The [`Game`] account */
  game: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.RegisterFleetsPointsModifierInput.layout("input"),
])

export function registerFleetsPointModifier(
  args: RegisterFleetsPointModifierArgs,
  accounts: RegisterFleetsPointModifierAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.key, isSigner: true, isWritable: false },
    { pubkey: accounts.profile, isSigner: false, isWritable: false },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.pointsCategory, isSigner: false, isWritable: false },
    {
      pubkey: accounts.pointsModifierAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.pointsProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.gameState, isSigner: false, isWritable: false },
    { pubkey: accounts.game, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([116, 90, 209, 36, 155, 187, 36, 138])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.RegisterFleetsPointsModifierInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
