import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeregisterSurveyDataUnitTrackerArgs {
  input: types.DeregisterSurveyDataUnitTrackerInputFields
}

export interface DeregisterSurveyDataUnitTrackerAccounts {
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
  /** The [`SurveyDataUnitTracker`] account */
  surveyDataUnitTracker: PublicKey
}

export const layout = borsh.struct([
  types.DeregisterSurveyDataUnitTrackerInput.layout("input"),
])

export function deregisterSurveyDataUnitTracker(
  args: DeregisterSurveyDataUnitTrackerArgs,
  accounts: DeregisterSurveyDataUnitTrackerAccounts,
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
    {
      pubkey: accounts.surveyDataUnitTracker,
      isSigner: false,
      isWritable: true,
    },
  ]
  const identifier = Buffer.from([255, 33, 61, 120, 136, 119, 184, 235])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.DeregisterSurveyDataUnitTrackerInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
