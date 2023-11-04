import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateFleetArgs {
  input: types.CreateFleetInputFields
}

export interface CreateFleetAccounts {
  gameAccountsAndProfile: {
    gameAndProfileAndFaction: {
      /** The key authorized for this instruction */
      key: PublicKey
      /** The [`Profile`] account */
      profile: PublicKey
      /** The faction that the profile belongs to. */
      profileFaction: PublicKey
      /** The [`Game`] account */
      gameId: PublicKey
    }
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The funder for the new `Fleet` */
  funder: PublicKey
  /** The [`Fleet`] account */
  fleet: PublicKey
  /** The [`FleetShips`] account */
  fleetShips: PublicKey
  /** The new fleet `cargo_hold` cargo pod (not initialized) */
  cargoHold: PublicKey
  /** The new fleet `fuel_tank` cargo pod (not initialized) */
  fuelTank: PublicKey
  /** The new fleet `ammo_bank` cargo pod (not initialized) */
  ammoBank: PublicKey
  /** The [`Ship`] Account - represents the first ship in the new fleet */
  ship: PublicKey
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The cargo stats definition account */
  cargoStatsDefinition: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.CreateFleetInput.layout("input")])

export function createFleet(
  args: CreateFleetArgs,
  accounts: CreateFleetAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.key,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profileFaction,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleetShips, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoHold, isSigner: false, isWritable: true },
    { pubkey: accounts.fuelTank, isSigner: false, isWritable: true },
    { pubkey: accounts.ammoBank, isSigner: false, isWritable: true },
    { pubkey: accounts.ship, isSigner: false, isWritable: false },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([76, 123, 81, 82, 235, 228, 156, 203])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.CreateFleetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
