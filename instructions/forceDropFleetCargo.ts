import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ForceDropFleetCargoAccounts {
  /** The `Fleet` Account */
  fleet: PublicKey
  /** The [`FleetShips`] account */
  fleetShips: PublicKey
  /** The origin cargo pod */
  cargoPod: PublicKey
  /** The `cargo_type` for the token */
  cargoType: PublicKey
  /** The cargo stats definition */
  cargoStatsDefinition: PublicKey
  /** The [`Game`] account */
  gameId: PublicKey
  /** The source token account - owned by the `cargo_pod` */
  tokenFrom: PublicKey
  /** The mint of the token account */
  tokenMint: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** Token Program */
  tokenProgram: PublicKey
}

export function forceDropFleetCargo(
  accounts: ForceDropFleetCargoAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleetShips, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoPod, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.gameId, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenMint, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([170, 120, 191, 46, 255, 195, 80, 221])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
