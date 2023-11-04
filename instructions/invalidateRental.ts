import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InvalidateRentalAccounts {
  /** This is a signer to help make sure the fleet won't be locked. */
  subProfileInvalidator: PublicKey
  /** The fleet to rent out. */
  fleet: PublicKey
}

export function invalidateRental(
  accounts: InvalidateRentalAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.subProfileInvalidator,
      isSigner: true,
      isWritable: false,
    },
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([180, 183, 106, 153, 255, 8, 232, 178])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
