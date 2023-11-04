import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateSurveyDataUnitTrackerArgs {
  input: types.UpdateSurveyDataUnitTrackerInputFields
}

export interface UpdateSurveyDataUnitTrackerAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The [`SurveyDataUnitTracker`] account */
  surveyDataUnitTracker: PublicKey
}

export const layout = borsh.struct([
  types.UpdateSurveyDataUnitTrackerInput.layout("input"),
])

export function updateSurveyDataUnitTracker(
  args: UpdateSurveyDataUnitTrackerArgs,
  accounts: UpdateSurveyDataUnitTrackerAccounts,
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
    {
      pubkey: accounts.surveyDataUnitTracker,
      isSigner: false,
      isWritable: true,
    },
  ]
  const identifier = Buffer.from([206, 27, 247, 25, 221, 207, 219, 35])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdateSurveyDataUnitTrackerInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
