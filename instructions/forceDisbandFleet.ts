import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ForceDisbandFleetArgs {
  input: types.ForcedDisbandFleetInputFields
}

export interface ForceDisbandFleetAccounts {
  /** The funder - pays for account rent */
  funder: PublicKey
  /** The new [`DisbandedFleet`] account */
  disbandedFleet: PublicKey
  /** The [`Fleet`] account */
  fleet: PublicKey
  /** The [`FleetShips`] account */
  fleetShips: PublicKey
  /** The fleet `cargo_hold` cargo pod */
  cargoHold: PublicKey
  /** The fleet `fuel_tank` cargo pod */
  fuelTank: PublicKey
  /** The fleet `ammo_bank` cargo pod */
  ammoBank: PublicKey
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /**
   * The [`Ship`]
   * Must provide at least one ship that is invalid for this instruction
   */
  ship: PublicKey
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.ForcedDisbandFleetInput.layout("input"),
])

export function forceDisbandFleet(
  args: ForceDisbandFleetArgs,
  accounts: ForceDisbandFleetAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.disbandedFleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleetShips, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoHold, isSigner: false, isWritable: true },
    { pubkey: accounts.fuelTank, isSigner: false, isWritable: true },
    { pubkey: accounts.ammoBank, isSigner: false, isWritable: true },
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
    { pubkey: accounts.ship, isSigner: false, isWritable: false },
    {
      pubkey: accounts.gameAccounts.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccounts.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([18, 245, 53, 119, 155, 57, 1, 78])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.ForcedDisbandFleetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
