import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PlanetJSON {
  kind: "Planet"
}

export class Planet {
  static readonly discriminator = 0
  static readonly kind = "Planet"
  readonly discriminator = 0
  readonly kind = "Planet"

  toJSON(): PlanetJSON {
    return {
      kind: "Planet",
    }
  }

  toEncodable() {
    return {
      Planet: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.LocationTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Planet" in obj) {
    return new Planet()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.LocationTypeJSON): types.LocationTypeKind {
  switch (obj.kind) {
    case "Planet": {
      return new Planet()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([borsh.struct([], "Planet")])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
