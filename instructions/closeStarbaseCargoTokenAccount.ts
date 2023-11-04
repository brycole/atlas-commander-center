import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CloseStarbaseCargoTokenAccountArgs {
  input: types.KeyIndexInputFields
}

export interface CloseStarbaseCargoTokenAccountAccounts {
  /** The funds_to - receives rent refund */
  fundsTo: PublicKey
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
  /** The new cargo pod */
  cargoPod: PublicKey
  /** The cargo type account */
  cargoType: PublicKey
  /** The cargo stats definition account */
  cargoStatsDefinition: PublicKey
  /** The source token account - owned by the `cargo_pod` */
  token: PublicKey
  /** The mint of the token accounts */
  tokenMint: PublicKey
  /** The Cargo Program */
  cargoProgram: PublicKey
  /** Token Program */
  tokenProgram: PublicKey
}

export const layout = borsh.struct([types.KeyIndexInput.layout("input")])

export function closeStarbaseCargoTokenAccount(
  args: CloseStarbaseCargoTokenAccountArgs,
  accounts: CloseStarbaseCargoTokenAccountAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.fundsTo, isSigner: false, isWritable: true },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbase,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.starbaseAndStarbasePlayer.starbasePlayer,
      isSigner: false,
      isWritable: false,
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
    { pubkey: accounts.cargoPod, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoType, isSigner: false, isWritable: false },
    {
      pubkey: accounts.cargoStatsDefinition,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.token, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenMint, isSigner: false, isWritable: true },
    { pubkey: accounts.cargoProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([97, 164, 98, 158, 180, 195, 251, 80])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      input: types.KeyIndexInput.toEncodable(args.input),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
