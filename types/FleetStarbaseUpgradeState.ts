import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NotFullyFilledJSON {
  kind: "NotFullyFilled"
}

export class NotFullyFilled {
  static readonly discriminator = 0
  static readonly kind = "NotFullyFilled"
  readonly discriminator = 0
  readonly kind = "NotFullyFilled"

  toJSON(): NotFullyFilledJSON {
    return {
      kind: "NotFullyFilled",
    }
  }

  toEncodable() {
    return {
      NotFullyFilled: {},
    }
  }
}

export interface StartedJSON {
  kind: "Started"
}

export class Started {
  static readonly discriminator = 1
  static readonly kind = "Started"
  readonly discriminator = 1
  readonly kind = "Started"

  toJSON(): StartedJSON {
    return {
      kind: "Started",
    }
  }

  toEncodable() {
    return {
      Started: {},
    }
  }
}

export interface BurningJSON {
  kind: "Burning"
}

export class Burning {
  static readonly discriminator = 2
  static readonly kind = "Burning"
  readonly discriminator = 2
  readonly kind = "Burning"

  toJSON(): BurningJSON {
    return {
      kind: "Burning",
    }
  }

  toEncodable() {
    return {
      Burning: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.FleetStarbaseUpgradeStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("NotFullyFilled" in obj) {
    return new NotFullyFilled()
  }
  if ("Started" in obj) {
    return new Started()
  }
  if ("Burning" in obj) {
    return new Burning()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.FleetStarbaseUpgradeStateJSON
): types.FleetStarbaseUpgradeStateKind {
  switch (obj.kind) {
    case "NotFullyFilled": {
      return new NotFullyFilled()
    }
    case "Started": {
      return new Started()
    }
    case "Burning": {
      return new Burning()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "NotFullyFilled"),
    borsh.struct([], "Started"),
    borsh.struct([], "Burning"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
