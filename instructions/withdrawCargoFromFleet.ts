import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WithdrawCargoFromFleetArgs {
  input: types.WithdrawCargoFromFleetInputFields
}

export interface WithdrawCargoFromFleetAccounts {
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
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The origin cargo pod, owned by the fleet */
  cargoPodFrom: PublicKey
  /** The destination cargo pod, owned by the Starbase player */
  cargoPodTo: PublicKey
  /** The cargo type account */
  cargoType: PublicKey
  /** The cargo stats definition account */
  cargoStatsDefinition: PublicKey
  /** The source token account - owned by the `cargo_pod_from` */
  tokenFrom: PublicKey
  /** The destination token account - owned by the `cargo_pod_to` */
  tokenTo: PublicKey
  /** The mint of the token accounts */
  tokenMint: PublicKey
  /** The funds_to - receives rent refund */
  fundsTo: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** Token Program */
  tokenProgram: PublicKey
  Account18: PublicKey
}

export const layout = borsh.struct([
  types.WithdrawCargoFromFleetInput.layout("input"),
])

export function withdrawCargoFromFleet(
  args: WithdrawCargoFromFleetArgs,
  accounts: WithdrawCargoFromFleetAccounts,
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
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.cargoPodFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoPodTo, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenMint, isSigner: false, isWritable: true },
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.Account18, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([5, 163, 128, 233, 108, 81, 31, 56])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.WithdrawCargoFromFleetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
