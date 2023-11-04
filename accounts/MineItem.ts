import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MineItemFields {
  /** The data version of this account. */
  version: number
  /** the game_id account this item is registered with */
  gameId: PublicKey
  /** The name of the `MineItem` */
  name: Array<number>
  /** the mint representing the items mined */
  mint: PublicKey
  /** The `MineItem` update id */
  mineItemUpdateId: BN
  /** How hard it is to mine this item -> Ranges from 1-10 */
  resourceHardness: number
  /** The number of resource accounts for this mine item */
  numResourceAccounts: BN
  /** bump for PDA */
  bump: number
}

export interface MineItemJSON {
  /** The data version of this account. */
  version: number
  /** the game_id account this item is registered with */
  gameId: string
  /** The name of the `MineItem` */
  name: Array<number>
  /** the mint representing the items mined */
  mint: string
  /** The `MineItem` update id */
  mineItemUpdateId: string
  /** How hard it is to mine this item -> Ranges from 1-10 */
  resourceHardness: number
  /** The number of resource accounts for this mine item */
  numResourceAccounts: string
  /** bump for PDA */
  bump: number
}

/** Represents a token registered as an item that can be mined */
export class MineItem {
  /** The data version of this account. */
  readonly version: number
  /** the game_id account this item is registered with */
  readonly gameId: PublicKey
  /** The name of the `MineItem` */
  readonly name: Array<number>
  /** the mint representing the items mined */
  readonly mint: PublicKey
  /** The `MineItem` update id */
  readonly mineItemUpdateId: BN
  /** How hard it is to mine this item -> Ranges from 1-10 */
  readonly resourceHardness: number
  /** The number of resource accounts for this mine item */
  readonly numResourceAccounts: BN
  /** bump for PDA */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    64, 55, 212, 19, 215, 156, 22, 66,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.publicKey("mint"),
    borsh.u64("mineItemUpdateId"),
    borsh.u16("resourceHardness"),
    borsh.u64("numResourceAccounts"),
    borsh.u8("bump"),
  ])

  constructor(fields: MineItemFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.name = fields.name
    this.mint = fields.mint
    this.mineItemUpdateId = fields.mineItemUpdateId
    this.resourceHardness = fields.resourceHardness
    this.numResourceAccounts = fields.numResourceAccounts
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<MineItem | null> {
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
  ): Promise<Array<MineItem | null>> {
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

  static decode(data: Buffer): MineItem {
    if (!data.slice(0, 8).equals(MineItem.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = MineItem.layout.decode(data.slice(8))

    return new MineItem({
      version: dec.version,
      gameId: dec.gameId,
      name: dec.name,
      mint: dec.mint,
      mineItemUpdateId: dec.mineItemUpdateId,
      resourceHardness: dec.resourceHardness,
      numResourceAccounts: dec.numResourceAccounts,
      bump: dec.bump,
    })
  }

  toJSON(): MineItemJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      name: this.name,
      mint: this.mint.toString(),
      mineItemUpdateId: this.mineItemUpdateId.toString(),
      resourceHardness: this.resourceHardness,
      numResourceAccounts: this.numResourceAccounts.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: MineItemJSON): MineItem {
    return new MineItem({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      name: obj.name,
      mint: new PublicKey(obj.mint),
      mineItemUpdateId: new BN(obj.mineItemUpdateId),
      resourceHardness: obj.resourceHardness,
      numResourceAccounts: new BN(obj.numResourceAccounts),
      bump: obj.bump,
    })
  }
}
