import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterSurveyDataUnitTrackerArgs {
  input: types.RegisterSurveyDataUnitTrackerInputFields
}

export interface RegisterSurveyDataUnitTrackerAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The funder for the new mine item */
  funder: PublicKey
  /** The [`SurveyDataUnitTracker`] account */
  surveyDataUnitTracker: PublicKey
  /** The mint for the new `SurveyDataUnitTracker` */
  mint: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.RegisterSurveyDataUnitTrackerInput.layout("input"),
])

export function registerSurveyDataUnitTracker(
  args: RegisterSurveyDataUnitTrackerArgs,
  accounts: RegisterSurveyDataUnitTrackerAccounts,
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
    {
      pubkey: accounts.surveyDataUnitTracker,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.mint, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([208, 72, 99, 63, 0, 214, 40, 155])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.RegisterSurveyDataUnitTrackerInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
