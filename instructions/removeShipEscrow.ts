import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RemoveShipEscrowArgs {
  input: types.RemoveShipEscrowInputFields
}

export interface RemoveShipEscrowAccounts {
  gameAccountsAndProfile: {
    gameAndProfileAndFaction: {
      /** The key authorized for this instruction */
      key: PublicKey
      /** The [`Profile`] account */
      profile: PublicKey
      /** The faction that the profile belongs to. */
      profileFaction: PublicKey
      /** The [`Game`] account */
      gameId: PublicKey
    }
    /** The [`GameState`] account */
    gameState: PublicKey
  }
  /** The funds_to - receives rent refund */
  fundsTo: PublicKey
  /** The [`SagePlayerProfile`] account */
  sagePlayerProfile: PublicKey
  /** The Destination Token Account */
  destinationTokenAccount: PublicKey
  /** The [`Ship`] Account */
  ship: PublicKey
  /** The Escrow Token Account */
  shipEscrowTokenAccount: PublicKey
  starbaseAndStarbasePlayer: {
    /** The [`Starbase`] account */
    starbase: PublicKey
    /** The [`StarbasePlayer`] Account */
    starbasePlayer: PublicKey
  }
  /** The Token Program */
  tokenProgram: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.RemoveShipEscrowInput.layout("input"),
])

export function removeShipEscrow(
  args: RemoveShipEscrowArgs,
  accounts: RemoveShipEscrowAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.key,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profile,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey:
        accounts.gameAccountsAndProfile.gameAndProfileAndFaction.profileFaction,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameAndProfileAndFaction.gameId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.gameAccountsAndProfile.gameState,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    { pubkey: accounts.sagePlayerProfile, isSigner: false, isWritable: true },
    {
      pubkey: accounts.destinationTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.ship, isSigner: false, isWritable: false },
    {
      pubkey: accounts.shipEscrowTokenAccount,
      isSigner: false,
      isWritable: true,
    },
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
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([67, 4, 108, 161, 186, 106, 125, 52])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.RemoveShipEscrowInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
