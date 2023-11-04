import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateShipEscrowArgs {
  input: types.UpdateShipEscrowInputFields
}

export interface UpdateShipEscrowAccounts {
  /** The old [`Ship`] Account */
  oldShip: PublicKey
  /** The address indicated as `next` in the `old_ship` account */
  next: PublicKey
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  gameAccounts: {
    /** The [`Game`] account */
    gameId: PublicKey
    /** The [`GameState`] account */
    gameState: PublicKey
  }
}

export const layout = borsh.struct([
  types.UpdateShipEscrowInput.layout("input"),
])

export function updateShipEscrow(
  args: UpdateShipEscrowArgs,
  accounts: UpdateShipEscrowAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.oldShip, isSigner: false, isWritable: false },
    { pubkey: accounts.next, isSigner: false, isWritable: false },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: true,
    },
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
  const identifier = Buffer.from([173, 207, 101, 247, 172, 228, 39, 105])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.UpdateShipEscrowInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
