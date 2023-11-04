import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MiscVariablesInputFields {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  warpLaneFuelCostReduction: number | null
  /** Respawn fee, charged in ATLAS */
  respawnFee: BN | null
}

export interface MiscVariablesInputJSON {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  warpLaneFuelCostReduction: number | null
  /** Respawn fee, charged in ATLAS */
  respawnFee: string | null
}

/** Struct for data input to update miscellaneous settings */
export class MiscVariablesInput {
  /** Percentage by which the "warp lane" movement type reduces warp fuel cost */
  readonly warpLaneFuelCostReduction: number | null
  /** Respawn fee, charged in ATLAS */
  readonly respawnFee: BN | null

  constructor(fields: MiscVariablesInputFields) {
    this.warpLaneFuelCostReduction = fields.warpLaneFuelCostReduction
    this.respawnFee = fields.respawnFee
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.option(borsh.i32(), "warpLaneFuelCostReduction"),
        borsh.option(borsh.u64(), "respawnFee"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MiscVariablesInput({
      warpLaneFuelCostReduction: obj.warpLaneFuelCostReduction,
      respawnFee: obj.respawnFee,
    })
  }

  static toEncodable(fields: MiscVariablesInputFields) {
    return {
      warpLaneFuelCostReduction: fields.warpLaneFuelCostReduction,
      respawnFee: fields.respawnFee,
    }
  }

  toJSON(): MiscVariablesInputJSON {
    return {
      warpLaneFuelCostReduction: this.warpLaneFuelCostReduction,
      respawnFee: (this.respawnFee && this.respawnFee.toString()) || null,
    }
  }

  static fromJSON(obj: MiscVariablesInputJSON): MiscVariablesInput {
    return new MiscVariablesInput({
      warpLaneFuelCostReduction: obj.warpLaneFuelCostReduction,
      respawnFee: (obj.respawnFee && new BN(obj.respawnFee)) || null,
    })
  }

  toEncodable() {
    return MiscVariablesInput.toEncodable(this)
  }
}
