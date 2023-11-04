import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ChangeRentalAccounts {
  /** This is a signer to help make sure the fleet won't be locked. */
  subProfileInvalidator: PublicKey
  /** The fleet to rent out. */
  fleet: PublicKey
  /** The new sub profile */
  newSubProfile: PublicKey
}

export function changeRental(
  accounts: ChangeRentalAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.subProfileInvalidator,
      isSigner: true,
      isWritable: false,
    },
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.newSubProfile, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([107, 122, 221, 24, 12, 249, 70, 193])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
