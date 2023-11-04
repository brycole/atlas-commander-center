import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RiskZonesDataFields {
  /** Mud security zone */
  mudSecurityZone: types.RiskZoneDataFields
  /** Oni security zone */
  oniSecurityZone: types.RiskZoneDataFields
  /** Ustur security zone */
  usturSecurityZone: types.RiskZoneDataFields
  /** High risk zone */
  highRiskZone: types.RiskZoneDataFields
  /** Medium risk zone */
  mediumRiskZone: types.RiskZoneDataFields
}

export interface RiskZonesDataJSON {
  /** Mud security zone */
  mudSecurityZone: types.RiskZoneDataJSON
  /** Oni security zone */
  oniSecurityZone: types.RiskZoneDataJSON
  /** Ustur security zone */
  usturSecurityZone: types.RiskZoneDataJSON
  /** High risk zone */
  highRiskZone: types.RiskZoneDataJSON
  /** Medium risk zone */
  mediumRiskZone: types.RiskZoneDataJSON
}

/** [`RiskZoneData`] for [`RiskZones`] */
export class RiskZonesData {
  /** Mud security zone */
  readonly mudSecurityZone: types.RiskZoneData
  /** Oni security zone */
  readonly oniSecurityZone: types.RiskZoneData
  /** Ustur security zone */
  readonly usturSecurityZone: types.RiskZoneData
  /** High risk zone */
  readonly highRiskZone: types.RiskZoneData
  /** Medium risk zone */
  readonly mediumRiskZone: types.RiskZoneData

  constructor(fields: RiskZonesDataFields) {
    this.mudSecurityZone = new types.RiskZoneData({ ...fields.mudSecurityZone })
    this.oniSecurityZone = new types.RiskZoneData({ ...fields.oniSecurityZone })
    this.usturSecurityZone = new types.RiskZoneData({
      ...fields.usturSecurityZone,
    })
    this.highRiskZone = new types.RiskZoneData({ ...fields.highRiskZone })
    this.mediumRiskZone = new types.RiskZoneData({ ...fields.mediumRiskZone })
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        types.RiskZoneData.layout("mudSecurityZone"),
        types.RiskZoneData.layout("oniSecurityZone"),
        types.RiskZoneData.layout("usturSecurityZone"),
        types.RiskZoneData.layout("highRiskZone"),
        types.RiskZoneData.layout("mediumRiskZone"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RiskZonesData({
      mudSecurityZone: types.RiskZoneData.fromDecoded(obj.mudSecurityZone),
      oniSecurityZone: types.RiskZoneData.fromDecoded(obj.oniSecurityZone),
      usturSecurityZone: types.RiskZoneData.fromDecoded(obj.usturSecurityZone),
      highRiskZone: types.RiskZoneData.fromDecoded(obj.highRiskZone),
      mediumRiskZone: types.RiskZoneData.fromDecoded(obj.mediumRiskZone),
    })
  }

  static toEncodable(fields: RiskZonesDataFields) {
    return {
      mudSecurityZone: types.RiskZoneData.toEncodable(fields.mudSecurityZone),
      oniSecurityZone: types.RiskZoneData.toEncodable(fields.oniSecurityZone),
      usturSecurityZone: types.RiskZoneData.toEncodable(
        fields.usturSecurityZone
      ),
      highRiskZone: types.RiskZoneData.toEncodable(fields.highRiskZone),
      mediumRiskZone: types.RiskZoneData.toEncodable(fields.mediumRiskZone),
    }
  }

  toJSON(): RiskZonesDataJSON {
    return {
      mudSecurityZone: this.mudSecurityZone.toJSON(),
      oniSecurityZone: this.oniSecurityZone.toJSON(),
      usturSecurityZone: this.usturSecurityZone.toJSON(),
      highRiskZone: this.highRiskZone.toJSON(),
      mediumRiskZone: this.mediumRiskZone.toJSON(),
    }
  }

  static fromJSON(obj: RiskZonesDataJSON): RiskZonesData {
    return new RiskZonesData({
      mudSecurityZone: types.RiskZoneData.fromJSON(obj.mudSecurityZone),
      oniSecurityZone: types.RiskZoneData.fromJSON(obj.oniSecurityZone),
      usturSecurityZone: types.RiskZoneData.fromJSON(obj.usturSecurityZone),
      highRiskZone: types.RiskZoneData.fromJSON(obj.highRiskZone),
      mediumRiskZone: types.RiskZoneData.fromJSON(obj.mediumRiskZone),
    })
  }

  toEncodable() {
    return RiskZonesData.toEncodable(this)
  }
}
