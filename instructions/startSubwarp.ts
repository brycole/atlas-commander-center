import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StartSubwarpArgs {
  input: types.StartSubwarpInputFields
}

export interface StartSubwarpAccounts {
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
}

export const layout = borsh.struct([types.StartSubwarpInput.layout("input")])

export function startSubwarp(
  args: StartSubwarpArgs,
  accounts: StartSubwarpAccounts,
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
  ]
  const identifier = Buffer.from([192, 104, 197, 40, 30, 39, 155, 48])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.StartSubwarpInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
