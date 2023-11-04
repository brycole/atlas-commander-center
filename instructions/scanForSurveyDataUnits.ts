import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ScanForSurveyDataUnitsArgs {
  input: types.ScanForSurveyDataUnitsInputFields
}

export interface ScanForSurveyDataUnitsAccounts {
  gameAccountsFleetAndOwner: {
    gameFleetAndOwner: {
      fleetAndOwner: {
        /** The key on the profile. */
        key: PublicKey
        /** The profile that owns the fleet. */
        owningProfile: PublicKey
        /** The faction that the profile belongs to. */
        owningProfileFaction: PublicKey
        /** The fleet. */
        fleet: PublicKey
      }
      /** The [`Game`] account */
      gameId: PublicKey
    }
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The [`SurveyDataUnitTracker`] account */
  surveyDataUnitTracker: PublicKey
  /** The `SurveyDataUnitTracker` signer */
  surveyDataUnitTrackerSigner: PublicKey
  /** The general cargo hold cargo pod for the fleet */
  cargoHold: PublicKey
  /** Source token account for the SDU, owned by `survey_data_unit_tracker_signer` */
  sduTokenFrom: PublicKey
  /** Destination token account for the SDU, owned by cargo_hold */
  sduTokenTo: PublicKey
  /** Token account for repair kit, owned by fleet */
  repairKitTokenFrom: PublicKey
  /** The food token mint */
  repairKitMint: PublicKey
  /** The cargo type of the SDU */
  sduCargoType: PublicKey
  /** The cargo type of Repair Kits */
  repairKitCargoType: PublicKey
  /** The cargo stats definition */
  cargoStatsDefinition: PublicKey
  /** The cargo program */
  cargoProgram: PublicKey
  /** The token program */
  tokenProgram: PublicKey
  /** Solana Instructions Sysvar */
  instructionsSysvar: PublicKey
  /** Solana recent slothashes */
  recentSlothashes: PublicKey
}

export const layout = borsh.struct([
  types.ScanForSurveyDataUnitsInput.layout("input"),
])

export function scanForSurveyDataUnits(
  args: ScanForSurveyDataUnitsArgs,
  accounts: ScanForSurveyDataUnitsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey:
        accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner.key,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner
          .owningProfile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner
          .owningProfileFaction,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner
          .fleet,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsFleetAndOwner.gameState,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.surveyDataUnitTracker,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.surveyDataUnitTrackerSigner,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.cargoHold, isSigner: false, isWritable: true },
    { pubkey: accounts.sduTokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.sduTokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.repairKitTokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.repairKitMint, isSigner: false, isWritable: true },
    { pubkey: accounts.sduCargoType, isSigner: false, isWritable: false },
    { pubkey: accounts.repairKitCargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.instructionsSysvar, isSigner: false, isWritable: false },
    { pubkey: accounts.recentSlothashes, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([84, 102, 234, 1, 126, 136, 186, 147])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.ScanForSurveyDataUnitsInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
