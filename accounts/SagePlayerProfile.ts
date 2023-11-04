import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SagePlayerProfileFields {
  /** The data version of this account */
  version: number
  /** The `Profile` key */
  playerProfile: PublicKey
  /** The id of the `Game` */
  gameId: PublicKey
  /** Bump of Account PDA */
  bump: number
}

export interface SagePlayerProfileJSON {
  /** The data version of this account */
  version: number
  /** The `Profile` key */
  playerProfile: string
  /** The id of the `Game` */
  gameId: string
  /** Bump of Account PDA */
  bump: number
}

/** A `SAGE` player's profile. */
export class SagePlayerProfile {
  /** The data version of this account */
  readonly version: number
  /** The `Profile` key */
  readonly playerProfile: PublicKey
  /** The id of the `Game` */
  readonly gameId: PublicKey
  /** Bump of Account PDA */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    10, 55, 75, 234, 126, 14, 47, 146,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("playerProfile"),
    borsh.publicKey("gameId"),
    borsh.u8("bump"),
  ])

  constructor(fields: SagePlayerProfileFields) {
    this.version = fields.version
    this.playerProfile = fields.playerProfile
    this.gameId = fields.gameId
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SagePlayerProfile | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<SagePlayerProfile | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): SagePlayerProfile {
    if (!data.slice(0, 8).equals(SagePlayerProfile.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SagePlayerProfile.layout.decode(data.slice(8))

    return new SagePlayerProfile({
      version: dec.version,
      playerProfile: dec.playerProfile,
      gameId: dec.gameId,
      bump: dec.bump,
    })
  }

  toJSON(): SagePlayerProfileJSON {
    return {
      version: this.version,
      playerProfile: this.playerProfile.toString(),
      gameId: this.gameId.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: SagePlayerProfileJSON): SagePlayerProfile {
    return new SagePlayerProfile({
      version: obj.version,
      playerProfile: new PublicKey(obj.playerProfile),
      gameId: new PublicKey(obj.gameId),
      bump: obj.bump,
    })
  }
}
