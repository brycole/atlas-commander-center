import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface StarbaseUpgradeFields {
  /** The `Starbase` being upgraded */
  starbase: PublicKey
  /** [`FleetStarbaseUpgradeState`] */
  upgradeState: number
  /** When the fleet started participation in the `Starbase` upgrade. */
  startUpgrade: BN
  /**
   * When the fleet completes participation in the `Starbase` upgrade. This is a "potential" end time, constrained by max resources or user decision.
   * If `upgrade_state` is set to `NotFullyFilled`, this is set to the max duration in upgrading state with the partial ingredients deposited.
   */
  endUpgrade: BN
  /** used to check if expected inputs have been supplied */
  checksum: Array<number>
}

export interface StarbaseUpgradeJSON {
  /** The `Starbase` being upgraded */
  starbase: string
  /** [`FleetStarbaseUpgradeState`] */
  upgradeState: number
  /** When the fleet started participation in the `Starbase` upgrade. */
  startUpgrade: string
  /**
   * When the fleet completes participation in the `Starbase` upgrade. This is a "potential" end time, constrained by max resources or user decision.
   * If `upgrade_state` is set to `NotFullyFilled`, this is set to the max duration in upgrading state with the partial ingredients deposited.
   */
  endUpgrade: string
  /** used to check if expected inputs have been supplied */
  checksum: Array<number>
}

/** The data for the `StarbaseUpgrade` state */
export class StarbaseUpgrade {
  /** The `Starbase` being upgraded */
  readonly starbase: PublicKey
  /** [`FleetStarbaseUpgradeState`] */
  readonly upgradeState: number
  /** When the fleet started participation in the `Starbase` upgrade. */
  readonly startUpgrade: BN
  /**
   * When the fleet completes participation in the `Starbase` upgrade. This is a "potential" end time, constrained by max resources or user decision.
   * If `upgrade_state` is set to `NotFullyFilled`, this is set to the max duration in upgrading state with the partial ingredients deposited.
   */
  readonly endUpgrade: BN
  /** used to check if expected inputs have been supplied */
  readonly checksum: Array<number>

  constructor(fields: StarbaseUpgradeFields) {
    this.starbase = fields.starbase
    this.upgradeState = fields.upgradeState
    this.startUpgrade = fields.startUpgrade
    this.endUpgrade = fields.endUpgrade
    this.checksum = fields.checksum
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("starbase"),
        borsh.u8("upgradeState"),
        borsh.i64("startUpgrade"),
        borsh.i64("endUpgrade"),
        borsh.array(borsh.u8(), 16, "checksum"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new StarbaseUpgrade({
      starbase: obj.starbase,
      upgradeState: obj.upgradeState,
      startUpgrade: obj.startUpgrade,
      endUpgrade: obj.endUpgrade,
      checksum: obj.checksum,
    })
  }

  static toEncodable(fields: StarbaseUpgradeFields) {
    return {
      starbase: fields.starbase,
      upgradeState: fields.upgradeState,
      startUpgrade: fields.startUpgrade,
      endUpgrade: fields.endUpgrade,
      checksum: fields.checksum,
    }
  }

  toJSON(): StarbaseUpgradeJSON {
    return {
      starbase: this.starbase.toString(),
      upgradeState: this.upgradeState,
      startUpgrade: this.startUpgrade.toString(),
      endUpgrade: this.endUpgrade.toString(),
      checksum: this.checksum,
    }
  }

  static fromJSON(obj: StarbaseUpgradeJSON): StarbaseUpgrade {
    return new StarbaseUpgrade({
      starbase: new PublicKey(obj.starbase),
      upgradeState: obj.upgradeState,
      startUpgrade: new BN(obj.startUpgrade),
      endUpgrade: new BN(obj.endUpgrade),
      checksum: obj.checksum,
    })
  }

  toEncodable() {
    return StarbaseUpgrade.toEncodable(this)
  }
}
