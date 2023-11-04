import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseDisbandedFleetArgs {
  input: types.CloseDisbandedFleetInputFields
}

export interface CloseDisbandedFleetAccounts {
  /** The key on the player profile. */
  key: PublicKey
  /** The player profile. */
  playerProfile: PublicKey
  /** The funds_to - receives rent refund */
  fundsTo: PublicKey
  /** The [`DisbandedFleet`] account */
  disbandedFleet: PublicKey
  /** The [`FleetShips`] account */
  fleetShips: PublicKey
}

export const layout = borsh.struct([
  types.CloseDisbandedFleetInput.layout("input"),
])

export function closeDisbandedFleet(
  args: CloseDisbandedFleetArgs,
  accounts: CloseDisbandedFleetAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.key, isSigner: true, isWritable: false },
    { pubkey: accounts.playerProfile, isSigner: false, isWritable: false },
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    { pubkey: accounts.disbandedFleet, isSigner: false, isWritable: true },
    { pubkey: accounts.fleetShips, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([214, 150, 149, 156, 245, 123, 37, 165])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.CloseDisbandedFleetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
