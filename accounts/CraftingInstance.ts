import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CraftingInstanceFields {
  /** The data version of this account */
  version: number
  /** The sequence id for the `Starbase` */
  seqId: number
  /** The number of crew taking part in the crafting process */
  numCrew: BN
  /** The `StarbasePlayer` account address */
  starbasePlayer: PublicKey
  /** The `CraftingProcess` account address */
  craftingProcess: PublicKey
  /** Bump of Account PDA */
  bump: number
}

export interface CraftingInstanceJSON {
  /** The data version of this account */
  version: number
  /** The sequence id for the `Starbase` */
  seqId: number
  /** The number of crew taking part in the crafting process */
  numCrew: string
  /** The `StarbasePlayer` account address */
  starbasePlayer: string
  /** The `CraftingProcess` account address */
  craftingProcess: string
  /** Bump of Account PDA */
  bump: number
}

/** This account is used to store relevant information for a crafting process instance */
export class CraftingInstance {
  /** The data version of this account */
  readonly version: number
  /** The sequence id for the `Starbase` */
  readonly seqId: number
  /** The number of crew taking part in the crafting process */
  readonly numCrew: BN
  /** The `StarbasePlayer` account address */
  readonly starbasePlayer: PublicKey
  /** The `CraftingProcess` account address */
  readonly craftingProcess: PublicKey
  /** Bump of Account PDA */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    90, 186, 155, 208, 93, 186, 112, 191,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.u16("seqId"),
    borsh.u64("numCrew"),
    borsh.publicKey("starbasePlayer"),
    borsh.publicKey("craftingProcess"),
    borsh.u8("bump"),
  ])

  constructor(fields: CraftingInstanceFields) {
    this.version = fields.version
    this.seqId = fields.seqId
    this.numCrew = fields.numCrew
    this.starbasePlayer = fields.starbasePlayer
    this.craftingProcess = fields.craftingProcess
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CraftingInstance | null> {
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
  ): Promise<Array<CraftingInstance | null>> {
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

  static decode(data: Buffer): CraftingInstance {
    if (!data.slice(0, 8).equals(CraftingInstance.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CraftingInstance.layout.decode(data.slice(8))

    return new CraftingInstance({
      version: dec.version,
      seqId: dec.seqId,
      numCrew: dec.numCrew,
      starbasePlayer: dec.starbasePlayer,
      craftingProcess: dec.craftingProcess,
      bump: dec.bump,
    })
  }

  toJSON(): CraftingInstanceJSON {
    return {
      version: this.version,
      seqId: this.seqId,
      numCrew: this.numCrew.toString(),
      starbasePlayer: this.starbasePlayer.toString(),
      craftingProcess: this.craftingProcess.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: CraftingInstanceJSON): CraftingInstance {
    return new CraftingInstance({
      version: obj.version,
      seqId: obj.seqId,
      numCrew: new BN(obj.numCrew),
      starbasePlayer: new PublicKey(obj.starbasePlayer),
      craftingProcess: new PublicKey(obj.craftingProcess),
      bump: obj.bump,
    })
  }
}
