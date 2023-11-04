import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SurveyDataUnitTrackerFields {
  /** The data version of this account. */
  version: number
  /** The game_id that this belongs to */
  gameId: PublicKey
  /** The Survey Data Unit Mint */
  mint: PublicKey
  /** The signer for this account */
  signer: PublicKey
  /** The signer for this account */
  signerBump: number
  /**
   * Survey Data Units found in the last `MAX_SECONDS` seconds
   * This is structured such that the 0th index represents SDUs found `MAX_SECONDS` seconds ago,
   * and the last index represents SDUs found in the most recent second
   * NB: the only reason why this is `[u32; MAX_SECONDS]` and not `[u16; MAX_SECONDS]` is to prevent overflows
   */
  surveyDataUnitBySecond: Array<number>
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number
  /**
   * The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage
   * 10,000 == 100%, 100 = 1%, etc.
   */
  probability: number
  /** The max number of SDUs that can be found while scanning */
  max: number
  /** The number of Sectors that can be scanned */
  numSectors: number
  /** The last time the `SurveyDataUnitTracker` was updated */
  lastUpdate: BN
}

export interface SurveyDataUnitTrackerJSON {
  /** The data version of this account. */
  version: number
  /** The game_id that this belongs to */
  gameId: string
  /** The Survey Data Unit Mint */
  mint: string
  /** The signer for this account */
  signer: string
  /** The signer for this account */
  signerBump: number
  /**
   * Survey Data Units found in the last `MAX_SECONDS` seconds
   * This is structured such that the 0th index represents SDUs found `MAX_SECONDS` seconds ago,
   * and the last index represents SDUs found in the most recent second
   * NB: the only reason why this is `[u32; MAX_SECONDS]` and not `[u16; MAX_SECONDS]` is to prevent overflows
   */
  surveyDataUnitBySecond: Array<number>
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  scanCooldown: number
  /**
   * The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage
   * 10,000 == 100%, 100 = 1%, etc.
   */
  probability: number
  /** The max number of SDUs that can be found while scanning */
  max: number
  /** The number of Sectors that can be scanned */
  numSectors: number
  /** The last time the `SurveyDataUnitTracker` was updated */
  lastUpdate: string
}

/** Survey Data Unit (SDU) Tracker */
export class SurveyDataUnitTracker {
  /** The data version of this account. */
  readonly version: number
  /** The game_id that this belongs to */
  readonly gameId: PublicKey
  /** The Survey Data Unit Mint */
  readonly mint: PublicKey
  /** The signer for this account */
  readonly signer: PublicKey
  /** The signer for this account */
  readonly signerBump: number
  /**
   * Survey Data Units found in the last `MAX_SECONDS` seconds
   * This is structured such that the 0th index represents SDUs found `MAX_SECONDS` seconds ago,
   * and the last index represents SDUs found in the most recent second
   * NB: the only reason why this is `[u32; MAX_SECONDS]` and not `[u16; MAX_SECONDS]` is to prevent overflows
   */
  readonly surveyDataUnitBySecond: Array<number>
  /** The global limit on how many SDUs can be found in a `MAX_SECONDS` second period */
  readonly limit: number
  /** The amount of time that must go by before someone can scan a sector again */
  readonly scanCooldown: number
  /**
   * The chance that a player gets an SDU on a legitimate scan, this is meant to be a percentage
   * 10,000 == 100%, 100 = 1%, etc.
   */
  readonly probability: number
  /** The max number of SDUs that can be found while scanning */
  readonly max: number
  /** The number of Sectors that can be scanned */
  readonly numSectors: number
  /** The last time the `SurveyDataUnitTracker` was updated */
  readonly lastUpdate: BN

  static readonly discriminator = Buffer.from([
    234, 127, 227, 90, 144, 65, 85, 111,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.publicKey("mint"),
    borsh.publicKey("signer"),
    borsh.u8("signerBump"),
    borsh.array(borsh.u32(), 60, "surveyDataUnitBySecond"),
    borsh.u32("limit"),
    borsh.u16("scanCooldown"),
    borsh.u16("probability"),
    borsh.u16("max"),
    borsh.u16("numSectors"),
    borsh.i64("lastUpdate"),
  ])

  constructor(fields: SurveyDataUnitTrackerFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.mint = fields.mint
    this.signer = fields.signer
    this.signerBump = fields.signerBump
    this.surveyDataUnitBySecond = fields.surveyDataUnitBySecond
    this.limit = fields.limit
    this.scanCooldown = fields.scanCooldown
    this.probability = fields.probability
    this.max = fields.max
    this.numSectors = fields.numSectors
    this.lastUpdate = fields.lastUpdate
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SurveyDataUnitTracker | null> {
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
  ): Promise<Array<SurveyDataUnitTracker | null>> {
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

  static decode(data: Buffer): SurveyDataUnitTracker {
    if (!data.slice(0, 8).equals(SurveyDataUnitTracker.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SurveyDataUnitTracker.layout.decode(data.slice(8))

    return new SurveyDataUnitTracker({
      version: dec.version,
      gameId: dec.gameId,
      mint: dec.mint,
      signer: dec.signer,
      signerBump: dec.signerBump,
      surveyDataUnitBySecond: dec.surveyDataUnitBySecond,
      limit: dec.limit,
      scanCooldown: dec.scanCooldown,
      probability: dec.probability,
      max: dec.max,
      numSectors: dec.numSectors,
      lastUpdate: dec.lastUpdate,
    })
  }

  toJSON(): SurveyDataUnitTrackerJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      mint: this.mint.toString(),
      signer: this.signer.toString(),
      signerBump: this.signerBump,
      surveyDataUnitBySecond: this.surveyDataUnitBySecond,
      limit: this.limit,
      scanCooldown: this.scanCooldown,
      probability: this.probability,
      max: this.max,
      numSectors: this.numSectors,
      lastUpdate: this.lastUpdate.toString(),
    }
  }

  static fromJSON(obj: SurveyDataUnitTrackerJSON): SurveyDataUnitTracker {
    return new SurveyDataUnitTracker({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      mint: new PublicKey(obj.mint),
      signer: new PublicKey(obj.signer),
      signerBump: obj.signerBump,
      surveyDataUnitBySecond: obj.surveyDataUnitBySecond,
      limit: obj.limit,
      scanCooldown: obj.scanCooldown,
      probability: obj.probability,
      max: obj.max,
      numSectors: obj.numSectors,
      lastUpdate: new BN(obj.lastUpdate),
    })
  }
}
