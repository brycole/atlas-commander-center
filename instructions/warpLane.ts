import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface WarpLaneArgs {
  input: types.WarpLaneInputFields
}

export interface WarpLaneAccounts {
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
  /** The [`Starbase`] account */
  fromStarbase: PublicKey
  /** The [`Starbase`] account */
  toStarbase: PublicKey
  /** The Sector account representing the fleet`s  current sector */
  fromSector: PublicKey
  /** The Sector account that `Fleet` will move to */
  toSector: PublicKey
  /** The fuel tank cargo pod */
  fuelTank: PublicKey
  /** The `Cargo Type` Account */
  cargoType: PublicKey
  /** The `CargoStatsDefinition` for the cargo type */
  statsDefinition: PublicKey
  /** The fuel source token account - owned by the `fuel_tank` */
  fuelTokenFrom: PublicKey
  /** Token Mint - The fuel mint */
  fuelMint: PublicKey
  /** The fee source token account */
  feeTokenFrom: PublicKey
  /** The fee destination token account */
  feeTokenTo: PublicKey
  /** Fee Token Mint */
  feeMint: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** Token Program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([types.WarpLaneInput.layout("input")])

export function warpLane(
  args: WarpLaneArgs,
  accounts: WarpLaneAccounts,
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
    { pubkey: accounts.fromStarbase, isSigner: false, isWritable: false },
    { pubkey: accounts.toStarbase, isSigner: false, isWritable: false },
    { pubkey: accounts.fromSector, isSigner: false, isWritable: false },
    { pubkey: accounts.toSector, isSigner: false, isWritable: false },
    { pubkey: accounts.fuelTank, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    { pubkey: accounts.statsDefinition, isSigner: false, isWritable: false },
    { pubkey: accounts.fuelTokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.fuelMint, isSigner: false, isWritable: true },
    { pubkey: accounts.feeTokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.feeTokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.feeMint, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([232, 188, 195, 49, 100, 72, 231, 243])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.WarpLaneInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
