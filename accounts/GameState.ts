import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GameStateFields {
  /** The data version of this account */
  version: number
  /** The sequence id for updates */
  updateId: BN
  /** The `Game` that this belongs to */
  gameId: PublicKey
  /** Fleet settings */
  fleet: types.FleetInfoFields
  /** Global levers */
  levers: types.LeversFields
  /** Miscellaneous settings */
  misc: types.MiscVariablesFields
  /** PDA bump */
  bump: number
}

export interface GameStateJSON {
  /** The data version of this account */
  version: number
  /** The sequence id for updates */
  updateId: string
  /** The `Game` that this belongs to */
  gameId: string
  /** Fleet settings */
  fleet: types.FleetInfoJSON
  /** Global levers */
  levers: types.LeversJSON
  /** Miscellaneous settings */
  misc: types.MiscVariablesJSON
  /** PDA bump */
  bump: number
}

/** Keeps track of variables that may change frequently during a `Game` session */
export class GameState {
  /** The data version of this account */
  readonly version: number
  /** The sequence id for updates */
  readonly updateId: BN
  /** The `Game` that this belongs to */
  readonly gameId: PublicKey
  /** Fleet settings */
  readonly fleet: types.FleetInfo
  /** Global levers */
  readonly levers: types.Levers
  /** Miscellaneous settings */
  readonly misc: types.MiscVariables
  /** PDA bump */
  readonly bump: number

  static readonly discriminator = Buffer.from([
    144, 94, 208, 172, 248, 99, 134, 120,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.u64("updateId"),
    borsh.publicKey("gameId"),
    types.FleetInfo.layout("fleet"),
    types.Levers.layout("levers"),
    types.MiscVariables.layout("misc"),
    borsh.u8("bump"),
  ])

  constructor(fields: GameStateFields) {
    this.version = fields.version
    this.updateId = fields.updateId
    this.gameId = fields.gameId
    this.fleet = new types.FleetInfo({ ...fields.fleet })
    this.levers = new types.Levers({ ...fields.levers })
    this.misc = new types.MiscVariables({ ...fields.misc })
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<GameState | null> {
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
  ): Promise<Array<GameState | null>> {
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

  static decode(data: Buffer): GameState {
    if (!data.slice(0, 8).equals(GameState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = GameState.layout.decode(data.slice(8))

    return new GameState({
      version: dec.version,
      updateId: dec.updateId,
      gameId: dec.gameId,
      fleet: types.FleetInfo.fromDecoded(dec.fleet),
      levers: types.Levers.fromDecoded(dec.levers),
      misc: types.MiscVariables.fromDecoded(dec.misc),
      bump: dec.bump,
    })
  }

  toJSON(): GameStateJSON {
    return {
      version: this.version,
      updateId: this.updateId.toString(),
      gameId: this.gameId.toString(),
      fleet: this.fleet.toJSON(),
      levers: this.levers.toJSON(),
      misc: this.misc.toJSON(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: GameStateJSON): GameState {
    return new GameState({
      version: obj.version,
      updateId: new BN(obj.updateId),
      gameId: new PublicKey(obj.gameId),
      fleet: types.FleetInfo.fromJSON(obj.fleet),
      levers: types.Levers.fromJSON(obj.levers),
      misc: types.MiscVariables.fromJSON(obj.misc),
      bump: obj.bump,
    })
  }
}
