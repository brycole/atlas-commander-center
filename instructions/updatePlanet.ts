import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdatePlanetArgs {
  input: types.UpdatePlanetInputFields
}

export interface UpdatePlanetAccounts {
  gameAndProfile: {
    /** The key authorized for this instruction */
    key: PublicKey
    /** The [`Profile`] account */
    profile: PublicKey
    /** The [`Game`] account */
    gameId: PublicKey
  }
  /** The [`Planet`] account */
  planet: PublicKey
}

export const layout = borsh.struct([types.UpdatePlanetInput.layout("input")])

export function updatePlanet(
  args: UpdatePlanetArgs,
  accounts: UpdatePlanetAccounts,
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
    { pubkey: accounts.planet, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([24, 44, 71, 134, 31, 32, 201, 178])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdatePlanetInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
