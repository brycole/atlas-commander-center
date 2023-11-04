import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FleetStateHandlerAccounts {
  /** The fleet. */
  fleet: PublicKey
  Account1: PublicKey
  Account2: PublicKey
  Account3: PublicKey
  Account4: PublicKey
  Account5: PublicKey
  Account6: PublicKey
  Account7: PublicKey
  Account8: PublicKey
  Account9: PublicKey
  Account10: PublicKey
  Account11: PublicKey
  Account12: PublicKey
  Account13: PublicKey
  Account14: PublicKey
  Account15: PublicKey
  Account16: PublicKey
  Account17: PublicKey
  Account18: PublicKey
  Account19: PublicKey
  Account20: PublicKey
}

export function fleetStateHandler(
  accounts: FleetStateHandlerAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fleet, isSigner: false, isWritable: true },
    { pubkey: accounts.Account1, isSigner: false, isWritable: false },
    { pubkey: accounts.Account2, isSigner: false, isWritable: true },
    { pubkey: accounts.Account3, isSigner: false, isWritable: true },
    { pubkey: accounts.Account4, isSigner: false, isWritable: false },
    { pubkey: accounts.Account5, isSigner: false, isWritable: true },
    { pubkey: accounts.Account6, isSigner: false, isWritable: true },
    { pubkey: accounts.Account7, isSigner: false, isWritable: false },
    { pubkey: accounts.Account8, isSigner: false, isWritable: true },
    { pubkey: accounts.Account9, isSigner: false, isWritable: true },
    { pubkey: accounts.Account10, isSigner: false, isWritable: true },
    { pubkey: accounts.Account11, isSigner: false, isWritable: true },
    { pubkey: accounts.Account12, isSigner: false, isWritable: true },
    { pubkey: accounts.Account13, isSigner: false, isWritable: true },
    { pubkey: accounts.Account14, isSigner: false, isWritable: false },
    { pubkey: accounts.Account15, isSigner: false, isWritable: false },
    { pubkey: accounts.Account16, isSigner: false, isWritable: false },
    { pubkey: accounts.Account17, isSigner: false, isWritable: false },
    { pubkey: accounts.Account18, isSigner: false, isWritable: false },
    { pubkey: accounts.Account19, isSigner: false, isWritable: false },
    { pubkey: accounts.Account20, isSigner: false, isWritable: false },


  ]
  const identifier = Buffer.from([114, 77, 252, 27, 52, 161, 2, 156])
  console.log("-------------_>>>>>_>>_>_>_>>_"+identifier.toString('hex'))
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
