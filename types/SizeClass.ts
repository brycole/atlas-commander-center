import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface XxSmallJSON {
  kind: "XxSmall"
}

export class XxSmall {
  static readonly discriminator = 0
  static readonly kind = "XxSmall"
  readonly discriminator = 0
  readonly kind = "XxSmall"

  toJSON(): XxSmallJSON {
    return {
      kind: "XxSmall",
    }
  }

  toEncodable() {
    return {
      XxSmall: {},
    }
  }
}

export interface XSmallJSON {
  kind: "XSmall"
}

export class XSmall {
  static readonly discriminator = 1
  static readonly kind = "XSmall"
  readonly discriminator = 1
  readonly kind = "XSmall"

  toJSON(): XSmallJSON {
    return {
      kind: "XSmall",
    }
  }

  toEncodable() {
    return {
      XSmall: {},
    }
  }
}

export interface SmallJSON {
  kind: "Small"
}

export class Small {
  static readonly discriminator = 2
  static readonly kind = "Small"
  readonly discriminator = 2
  readonly kind = "Small"

  toJSON(): SmallJSON {
    return {
      kind: "Small",
    }
  }

  toEncodable() {
    return {
      Small: {},
    }
  }
}

export interface MediumJSON {
  kind: "Medium"
}

export class Medium {
  static readonly discriminator = 3
  static readonly kind = "Medium"
  readonly discriminator = 3
  readonly kind = "Medium"

  toJSON(): MediumJSON {
    return {
      kind: "Medium",
    }
  }

  toEncodable() {
    return {
      Medium: {},
    }
  }
}

export interface LargeJSON {
  kind: "Large"
}

export class Large {
  static readonly discriminator = 4
  static readonly kind = "Large"
  readonly discriminator = 4
  readonly kind = "Large"

  toJSON(): LargeJSON {
    return {
      kind: "Large",
    }
  }

  toEncodable() {
    return {
      Large: {},
    }
  }
}

export interface CapitalJSON {
  kind: "Capital"
}

export class Capital {
  static readonly discriminator = 5
  static readonly kind = "Capital"
  readonly discriminator = 5
  readonly kind = "Capital"

  toJSON(): CapitalJSON {
    return {
      kind: "Capital",
    }
  }

  toEncodable() {
    return {
      Capital: {},
    }
  }
}

export interface CommanderJSON {
  kind: "Commander"
}

export class Commander {
  static readonly discriminator = 6
  static readonly kind = "Commander"
  readonly discriminator = 6
  readonly kind = "Commander"

  toJSON(): CommanderJSON {
    return {
      kind: "Commander",
    }
  }

  toEncodable() {
    return {
      Commander: {},
    }
  }
}

export interface TitanJSON {
  kind: "Titan"
}

export class Titan {
  static readonly discriminator = 7
  static readonly kind = "Titan"
  readonly discriminator = 7
  readonly kind = "Titan"

  toJSON(): TitanJSON {
    return {
      kind: "Titan",
    }
  }

  toEncodable() {
    return {
      Titan: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.SizeClassKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("XxSmall" in obj) {
    return new XxSmall()
  }
  if ("XSmall" in obj) {
    return new XSmall()
  }
  if ("Small" in obj) {
    return new Small()
  }
  if ("Medium" in obj) {
    return new Medium()
  }
  if ("Large" in obj) {
    return new Large()
  }
  if ("Capital" in obj) {
    return new Capital()
  }
  if ("Commander" in obj) {
    return new Commander()
  }
  if ("Titan" in obj) {
    return new Titan()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SizeClassJSON): types.SizeClassKind {
  switch (obj.kind) {
    case "XxSmall": {
      return new XxSmall()
    }
    case "XSmall": {
      return new XSmall()
    }
    case "Small": {
      return new Small()
    }
    case "Medium": {
      return new Medium()
    }
    case "Large": {
      return new Large()
    }
    case "Capital": {
      return new Capital()
    }
    case "Commander": {
      return new Commander()
    }
    case "Titan": {
      return new Titan()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "XxSmall"),
    borsh.struct([], "XSmall"),
    borsh.struct([], "Small"),
    borsh.struct([], "Medium"),
    borsh.struct([], "Large"),
    borsh.struct([], "Capital"),
    borsh.struct([], "Commander"),
    borsh.struct([], "Titan"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
