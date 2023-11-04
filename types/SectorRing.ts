import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InnerJSON {
  kind: "Inner"
}

export class Inner {
  static readonly discriminator = 0
  static readonly kind = "Inner"
  readonly discriminator = 0
  readonly kind = "Inner"

  toJSON(): InnerJSON {
    return {
      kind: "Inner",
    }
  }

  toEncodable() {
    return {
      Inner: {},
    }
  }
}

export interface MidJSON {
  kind: "Mid"
}

export class Mid {
  static readonly discriminator = 1
  static readonly kind = "Mid"
  readonly discriminator = 1
  readonly kind = "Mid"

  toJSON(): MidJSON {
    return {
      kind: "Mid",
    }
  }

  toEncodable() {
    return {
      Mid: {},
    }
  }
}

export interface OuterJSON {
  kind: "Outer"
}

export class Outer {
  static readonly discriminator = 2
  static readonly kind = "Outer"
  readonly discriminator = 2
  readonly kind = "Outer"

  toJSON(): OuterJSON {
    return {
      kind: "Outer",
    }
  }

  toEncodable() {
    return {
      Outer: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.SectorRingKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Inner" in obj) {
    return new Inner()
  }
  if ("Mid" in obj) {
    return new Mid()
  }
  if ("Outer" in obj) {
    return new Outer()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SectorRingJSON): types.SectorRingKind {
  switch (obj.kind) {
    case "Inner": {
      return new Inner()
    }
    case "Mid": {
      return new Mid()
    }
    case "Outer": {
      return new Outer()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Inner"),
    borsh.struct([], "Mid"),
    borsh.struct([], "Outer"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
