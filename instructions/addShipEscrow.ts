import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface AddShipEscrowArgs {
  input: types.AddShipEscrowInputFields
}

export interface AddShipEscrowAccounts {
  /** The funder - pays for account rent */
  funder: PublicKey
  /** The [`SagePlayerProfile`] account */
  sagePlayerProfile: PublicKey
  /** The Origin Token Account */
  originTokenAccount: PublicKey
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
  /** The Token Program */
  tokenProgram: PublicKey
  /** The Solana System program */
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.AddShipEscrowInput.layout("input")])

export function addShipEscrow(
  args: AddShipEscrowArgs,
  accounts: AddShipEscrowAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.funder, isSigner: true, isWritable: true },
    { pubkey: accounts.sagePlayerProfile, isSigner: false, isWritable: true },
    { pubkey: accounts.originTokenAccount, isSigner: false, isWritable: true },
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
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([186, 19, 218, 150, 167, 181, 212, 89])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.AddShipEscrowInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
