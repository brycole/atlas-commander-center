import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DrainSurveyDataUnitsBankArgs {
  input: types.KeyIndexInputFields
}

export interface DrainSurveyDataUnitsBankAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** Where the closing rent refunds go. */
  fundsTo: PublicKey
  /** The [`SurveyDataUnitTracker`] account */
  surveyDataUnitTracker: PublicKey
  /** The `SurveyDataUnitTracker` signer */
  surveyDataUnitTrackerSigner: PublicKey
  /** The SDU token bank to drain */
  tokenFrom: PublicKey
  /** Where to send tokens from the bank */
  tokenTo: PublicKey
  /** The [Token] program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([types.KeyIndexInput.layout("input")])

export function drainSurveyDataUnitsBank(
  args: DrainSurveyDataUnitsBankArgs,
  accounts: DrainSurveyDataUnitsBankAccounts,
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
      isWritable: false,
    },
    {
      pubkey: accounts.surveyDataUnitTrackerSigner,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([227, 99, 86, 55, 218, 201, 96, 208])
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
