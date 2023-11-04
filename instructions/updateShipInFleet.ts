import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateShipInFleetArgs {
  input: types.UpdateShipFleetInputFields
}

export interface UpdateShipInFleetAccounts {
  /** The [`Fleet`] account */
  fleet: PublicKey
  /** The [`FleetShips`] account */
  fleetShips: PublicKey
  /** The old [`Ship`] Account */
  oldShip: PublicKey
  /** The address indicated as `next` in the `old_ship` account */
  next: PublicKey
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
}

export const layout = borsh.struct([types.UpdateShipFleetInput.layout("input")])

export function updateShipInFleet(
  args: UpdateShipInFleetArgs,
  accounts: UpdateShipInFleetAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleetShips, isSigner: false, isWritable: true },
    { pubkey: accounts.oldShip, isSigner: false, isWritable: false },
    { pubkey: accounts.next, isSigner: false, isWritable: false },
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
  ]
  const identifier = Buffer.from([213, 83, 186, 229, 179, 31, 172, 253])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdateShipFleetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
