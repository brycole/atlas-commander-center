import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface StarbaseFields {
  /** The data version of this `Starbase` account. */
  version: number
  /** the game_id that this `Starbase` belongs to */
  gameId: PublicKey
  /** the sector that this `Starbase` belongs to */
  sector: Array<BN>
  /** the [`CraftingFacility`] to use for crafting at this `Starbase` */
  craftingFacility: PublicKey
  /** The name of this `Starbase` */
  name: Array<number>
  /** coordinates as [x, y] */
  subCoordinates: Array<BN>
  /** The faction of the `Starbase`. */
  faction: number
  /** bump for PDA */
  bump: number
  /** The sequence id for the `Starbase` */
  seqId: number
  /** The state of the `Starbase`. Is a [`StarbaseState`]. */
  state: number
  /** The level of the `Starbase`. */
  level: number
  /** The `Starbase` health points. */
  hp: BN
  /** The `Starbase` shield points. */
  sp: BN
  /** The planet position (`sector::state::Ring`) available for this `Starbase` */
  sectorRingAvailable: number
  /** The `Starbase` upgrade state using `StarbaseUpgradeLevelState` */
  upgradeState: BN
  /** The last time the starbase was built or destroyed */
  builtDestroyedTimestamp: BN
  /** The number of fleets currently upgrading the `Starbase` */
  numUpgradingFleets: BN
  /** The total rate at which the SB is currently upgrading */
  totalUpgradeRate: BN
  /** The total received amount of material for upgrading the `Starbase` until the `last_updated_rate_timestamp` */
  receivedUpgradeMaterials: BN
  /** The total required amount of material for upgrading the `Starbase` */
  requiredUpgradeMaterials: BN
  /** The last time the SB total upgrade rate was updated */
  lastUpdatedRateTimestamp: BN
}

export interface StarbaseJSON {
  /** The data version of this `Starbase` account. */
  version: number
  /** the game_id that this `Starbase` belongs to */
  gameId: string
  /** the sector that this `Starbase` belongs to */
  sector: Array<string>
  /** the [`CraftingFacility`] to use for crafting at this `Starbase` */
  craftingFacility: string
  /** The name of this `Starbase` */
  name: Array<number>
  /** coordinates as [x, y] */
  subCoordinates: Array<string>
  /** The faction of the `Starbase`. */
  faction: number
  /** bump for PDA */
  bump: number
  /** The sequence id for the `Starbase` */
  seqId: number
  /** The state of the `Starbase`. Is a [`StarbaseState`]. */
  state: number
  /** The level of the `Starbase`. */
  level: number
  /** The `Starbase` health points. */
  hp: string
  /** The `Starbase` shield points. */
  sp: string
  /** The planet position (`sector::state::Ring`) available for this `Starbase` */
  sectorRingAvailable: number
  /** The `Starbase` upgrade state using `StarbaseUpgradeLevelState` */
  upgradeState: string
  /** The last time the starbase was built or destroyed */
  builtDestroyedTimestamp: string
  /** The number of fleets currently upgrading the `Starbase` */
  numUpgradingFleets: string
  /** The total rate at which the SB is currently upgrading */
  totalUpgradeRate: string
  /** The total received amount of material for upgrading the `Starbase` until the `last_updated_rate_timestamp` */
  receivedUpgradeMaterials: string
  /** The total required amount of material for upgrading the `Starbase` */
  requiredUpgradeMaterials: string
  /** The last time the SB total upgrade rate was updated */
  lastUpdatedRateTimestamp: string
}

/** Starbase */
export class Starbase {
  /** The data version of this `Starbase` account. */
  readonly version: number
  /** the game_id that this `Starbase` belongs to */
  readonly gameId: PublicKey
  /** the sector that this `Starbase` belongs to */
  readonly sector: Array<BN>
  /** the [`CraftingFacility`] to use for crafting at this `Starbase` */
  readonly craftingFacility: PublicKey
  /** The name of this `Starbase` */
  readonly name: Array<number>
  /** coordinates as [x, y] */
  readonly subCoordinates: Array<BN>
  /** The faction of the `Starbase`. */
  readonly faction: number
  /** bump for PDA */
  readonly bump: number
  /** The sequence id for the `Starbase` */
  readonly seqId: number
  /** The state of the `Starbase`. Is a [`StarbaseState`]. */
  readonly state: number
  /** The level of the `Starbase`. */
  readonly level: number
  /** The `Starbase` health points. */
  readonly hp: BN
  /** The `Starbase` shield points. */
  readonly sp: BN
  /** The planet position (`sector::state::Ring`) available for this `Starbase` */
  readonly sectorRingAvailable: number
  /** The `Starbase` upgrade state using `StarbaseUpgradeLevelState` */
  readonly upgradeState: BN
  /** The last time the starbase was built or destroyed */
  readonly builtDestroyedTimestamp: BN
  /** The number of fleets currently upgrading the `Starbase` */
  readonly numUpgradingFleets: BN
  /** The total rate at which the SB is currently upgrading */
  readonly totalUpgradeRate: BN
  /** The total received amount of material for upgrading the `Starbase` until the `last_updated_rate_timestamp` */
  readonly receivedUpgradeMaterials: BN
  /** The total required amount of material for upgrading the `Starbase` */
  readonly requiredUpgradeMaterials: BN
  /** The last time the SB total upgrade rate was updated */
  readonly lastUpdatedRateTimestamp: BN

  static readonly discriminator = Buffer.from([
    204, 182, 29, 231, 220, 29, 52, 2,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("version"),
    borsh.publicKey("gameId"),
    borsh.array(borsh.i64(), 2, "sector"),
    borsh.publicKey("craftingFacility"),
    borsh.array(borsh.u8(), 64, "name"),
    borsh.array(borsh.i64(), 2, "subCoordinates"),
    borsh.u8("faction"),
    borsh.u8("bump"),
    borsh.u16("seqId"),
    borsh.u8("state"),
    borsh.u8("level"),
    borsh.u64("hp"),
    borsh.u64("sp"),
    borsh.u8("sectorRingAvailable"),
    borsh.i64("upgradeState"),
    borsh.i64("builtDestroyedTimestamp"),
    borsh.u64("numUpgradingFleets"),
    borsh.u64("totalUpgradeRate"),
    borsh.u64("receivedUpgradeMaterials"),
    borsh.u64("requiredUpgradeMaterials"),
    borsh.i64("lastUpdatedRateTimestamp"),
  ])

  constructor(fields: StarbaseFields) {
    this.version = fields.version
    this.gameId = fields.gameId
    this.sector = fields.sector
    this.craftingFacility = fields.craftingFacility
    this.name = fields.name
    this.subCoordinates = fields.subCoordinates
    this.faction = fields.faction
    this.bump = fields.bump
    this.seqId = fields.seqId
    this.state = fields.state
    this.level = fields.level
    this.hp = fields.hp
    this.sp = fields.sp
    this.sectorRingAvailable = fields.sectorRingAvailable
    this.upgradeState = fields.upgradeState
    this.builtDestroyedTimestamp = fields.builtDestroyedTimestamp
    this.numUpgradingFleets = fields.numUpgradingFleets
    this.totalUpgradeRate = fields.totalUpgradeRate
    this.receivedUpgradeMaterials = fields.receivedUpgradeMaterials
    this.requiredUpgradeMaterials = fields.requiredUpgradeMaterials
    this.lastUpdatedRateTimestamp = fields.lastUpdatedRateTimestamp
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Starbase | null> {
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
  ): Promise<Array<Starbase | null>> {
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

  static decode(data: Buffer): Starbase {
    if (!data.slice(0, 8).equals(Starbase.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Starbase.layout.decode(data.slice(8))

    return new Starbase({
      version: dec.version,
      gameId: dec.gameId,
      sector: dec.sector,
      craftingFacility: dec.craftingFacility,
      name: dec.name,
      subCoordinates: dec.subCoordinates,
      faction: dec.faction,
      bump: dec.bump,
      seqId: dec.seqId,
      state: dec.state,
      level: dec.level,
      hp: dec.hp,
      sp: dec.sp,
      sectorRingAvailable: dec.sectorRingAvailable,
      upgradeState: dec.upgradeState,
      builtDestroyedTimestamp: dec.builtDestroyedTimestamp,
      numUpgradingFleets: dec.numUpgradingFleets,
      totalUpgradeRate: dec.totalUpgradeRate,
      receivedUpgradeMaterials: dec.receivedUpgradeMaterials,
      requiredUpgradeMaterials: dec.requiredUpgradeMaterials,
      lastUpdatedRateTimestamp: dec.lastUpdatedRateTimestamp,
    })
  }

  toJSON(): StarbaseJSON {
    return {
      version: this.version,
      gameId: this.gameId.toString(),
      sector: this.sector.map((item) => item.toString()),
      craftingFacility: this.craftingFacility.toString(),
      name: this.name,
      subCoordinates: this.subCoordinates.map((item) => item.toString()),
      faction: this.faction,
      bump: this.bump,
      seqId: this.seqId,
      state: this.state,
      level: this.level,
      hp: this.hp.toString(),
      sp: this.sp.toString(),
      sectorRingAvailable: this.sectorRingAvailable,
      upgradeState: this.upgradeState.toString(),
      builtDestroyedTimestamp: this.builtDestroyedTimestamp.toString(),
      numUpgradingFleets: this.numUpgradingFleets.toString(),
      totalUpgradeRate: this.totalUpgradeRate.toString(),
      receivedUpgradeMaterials: this.receivedUpgradeMaterials.toString(),
      requiredUpgradeMaterials: this.requiredUpgradeMaterials.toString(),
      lastUpdatedRateTimestamp: this.lastUpdatedRateTimestamp.toString(),
    }
  }

  static fromJSON(obj: StarbaseJSON): Starbase {
    return new Starbase({
      version: obj.version,
      gameId: new PublicKey(obj.gameId),
      sector: obj.sector.map((item) => new BN(item)),
      craftingFacility: new PublicKey(obj.craftingFacility),
      name: obj.name,
      subCoordinates: obj.subCoordinates.map((item) => new BN(item)),
      faction: obj.faction,
      bump: obj.bump,
      seqId: obj.seqId,
      state: obj.state,
      level: obj.level,
      hp: new BN(obj.hp),
      sp: new BN(obj.sp),
      sectorRingAvailable: obj.sectorRingAvailable,
      upgradeState: new BN(obj.upgradeState),
      builtDestroyedTimestamp: new BN(obj.builtDestroyedTimestamp),
      numUpgradingFleets: new BN(obj.numUpgradingFleets),
      totalUpgradeRate: new BN(obj.totalUpgradeRate),
      receivedUpgradeMaterials: new BN(obj.receivedUpgradeMaterials),
      requiredUpgradeMaterials: new BN(obj.requiredUpgradeMaterials),
      lastUpdatedRateTimestamp: new BN(obj.lastUpdatedRateTimestamp),
    })
  }
}
