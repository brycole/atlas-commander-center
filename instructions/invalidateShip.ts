import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InvalidateShipArgs {
  keyIndex: number
}

export interface InvalidateShipAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The current [`Ship`] account */
  ship: PublicKey
}

export const layout = borsh.struct([borsh.u16("keyIndex")])

export function invalidateShip(
  args: InvalidateShipArgs,
  accounts: InvalidateShipAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.gameAndProfile.key, isSigner: true, isWritable: false },
    {
      pubkey: accounts.gameAndProfile.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAndProfile.gameId,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.ship, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([8, 7, 115, 86, 246, 67, 87, 148])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      keyIndex: args.keyIndex,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
