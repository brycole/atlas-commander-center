import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AddRentalArgs {
  ownerKeyIndex: number
}

export interface AddRentalAccounts {
  /** The fleet owner's profile. */
  ownerProfile: PublicKey
  /** The key on the owner profile with renting permissions. */
  ownerKey: PublicKey
  /** This is a signer to help make sure the fleet won't be locked. */
  invalidator: PublicKey
  /** The profile to rent to. */
  subProfile: PublicKey
  /** The fleet to rent out. */
  fleet: PublicKey
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
}

export const layout = borsh.struct([borsh.u16("ownerKeyIndex")])

export function addRental(
  args: AddRentalArgs,
  accounts: AddRentalAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.ownerProfile, isSigner: false, isWritable: false },
    { pubkey: accounts.ownerKey, isSigner: true, isWritable: false },
    { pubkey: accounts.invalidator, isSigner: true, isWritable: false },
    { pubkey: accounts.subProfile, isSigner: false, isWritable: false },
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
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
  const identifier = Buffer.from([213, 113, 170, 123, 187, 90, 28, 115])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      ownerKeyIndex: args.ownerKeyIndex,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
