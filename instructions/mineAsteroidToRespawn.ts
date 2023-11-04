import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MineAsteroidToRespawnArgs {
  input: types.MineAsteroidToRespawnInputFields
}

export interface MineAsteroidToRespawnAccounts {
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
  /** The [`Resource`] account */
  resource: PublicKey
  /** The [`Planet`] account */
  planet: PublicKey
  /** The fuel tank cargo pod */
  fuelTank: PublicKey
  /** The source token account for fuel - owned by the `fuel_tank` */
  fuelTokenFrom: PublicKey
  /** Source Token account for ATLAS, owned by the player */
  atlasTokenFrom: PublicKey
  /** Vault Token account for ATLAS */
  atlasTokenTo: PublicKey
  /** The Solana Token Program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([
  types.MineAsteroidToRespawnInput.layout("input"),
])

export function mineAsteroidToRespawn(
  args: MineAsteroidToRespawnArgs,
  accounts: MineAsteroidToRespawnAccounts,
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
    { pubkey: accounts.resource, isSigner: false, isWritable: true },
    { pubkey: accounts.planet, isSigner: false, isWritable: true },
    { pubkey: accounts.fuelTank, isSigner: false, isWritable: false },
    { pubkey: accounts.fuelTokenFrom, isSigner: false, isWritable: false },
    { pubkey: accounts.atlasTokenFrom, isSigner: false, isWritable: true },
    { pubkey: accounts.atlasTokenTo, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([208, 63, 135, 108, 218, 252, 36, 0])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.MineAsteroidToRespawnInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
