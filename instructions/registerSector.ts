import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RegisterSectorArgs {
  coordinates: Array<BN>
  name: Array<number>
  keyIndex: number
}

export interface RegisterSectorAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The funder for the new sector */
  funder: PublicKey
  /** The discoverer of this sector */
  discoverer: PublicKey
  /** The [`Sector`] account */
  sector: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.array(borsh.i64(), 2, "coordinates"),
  borsh.array(borsh.u8(), 64, "name"),
  borsh.u16("keyIndex"),
])

export function registerSector(
  args: RegisterSectorArgs,
  accounts: RegisterSectorAccounts,
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
      isWritable: false,
    },
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.discoverer, isSigner: false, isWritable: false },
    { pubkey: accounts.sector, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([55, 57, 58, 192, 36, 235, 36, 109])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      coordinates: args.coordinates,
      name: args.name,
      keyIndex: args.keyIndex,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
