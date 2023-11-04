import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MiscVariablesFields {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  warpLaneFuelCostReduction: number
  /**
   * Respawn fee; You cannot enter into the respawning state without paying this fee
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  respawnFee: BN
}

export interface MiscVariablesJSON {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  warpLaneFuelCostReduction: number
  /**
   * Respawn fee; You cannot enter into the respawning state without paying this fee
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  respawnFee: string
}

/** Miscellaneous game state variables */
export class MiscVariables {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  readonly warpLaneFuelCostReduction: number
  /**
   * Respawn fee; You cannot enter into the respawning state without paying this fee
   * Since ATLAS has 8 decimal places, units are in the smallest value of ATLAS possible.
   */
  readonly respawnFee: BN

  constructor(fields: MiscVariablesFields) {
    this.warpLaneFuelCostReduction = fields.warpLaneFuelCostReduction
    this.respawnFee = fields.respawnFee
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.i32("warpLaneFuelCostReduction"), borsh.u64("respawnFee")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MiscVariables({
      warpLaneFuelCostReduction: obj.warpLaneFuelCostReduction,
      respawnFee: obj.respawnFee,
    })
  }

  static toEncodable(fields: MiscVariablesFields) {
    return {
      warpLaneFuelCostReduction: fields.warpLaneFuelCostReduction,
      respawnFee: fields.respawnFee,
    }
  }

  toJSON(): MiscVariablesJSON {
    return {
      warpLaneFuelCostReduction: this.warpLaneFuelCostReduction,
      respawnFee: this.respawnFee.toString(),
    }
  }

  static fromJSON(obj: MiscVariablesJSON): MiscVariables {
    return new MiscVariables({
      warpLaneFuelCostReduction: obj.warpLaneFuelCostReduction,
      respawnFee: new BN(obj.respawnFee),
    })
  }

  toEncodable() {
    return MiscVariables.toEncodable(this)
  }
}
