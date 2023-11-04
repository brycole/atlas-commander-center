import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TerrestrialJSON {
  kind: "Terrestrial"
}

export class Terrestrial {
  static readonly discriminator = 0
  static readonly kind = "Terrestrial"
  readonly discriminator = 0
  readonly kind = "Terrestrial"

  toJSON(): TerrestrialJSON {
    return {
      kind: "Terrestrial",
    }
  }

  toEncodable() {
    return {
      Terrestrial: {},
    }
  }
}

export interface VolcanicJSON {
  kind: "Volcanic"
}

export class Volcanic {
  static readonly discriminator = 1
  static readonly kind = "Volcanic"
  readonly discriminator = 1
  readonly kind = "Volcanic"

  toJSON(): VolcanicJSON {
    return {
      kind: "Volcanic",
    }
  }

  toEncodable() {
    return {
      Volcanic: {},
    }
  }
}

export interface BarrenJSON {
  kind: "Barren"
}

export class Barren {
  static readonly discriminator = 2
  static readonly kind = "Barren"
  readonly discriminator = 2
  readonly kind = "Barren"

  toJSON(): BarrenJSON {
    return {
      kind: "Barren",
    }
  }

  toEncodable() {
    return {
      Barren: {},
    }
  }
}

export interface AsteroidBeltJSON {
  kind: "AsteroidBelt"
}

export class AsteroidBelt {
  static readonly discriminator = 3
  static readonly kind = "AsteroidBelt"
  readonly discriminator = 3
  readonly kind = "AsteroidBelt"

  toJSON(): AsteroidBeltJSON {
    return {
      kind: "AsteroidBelt",
    }
  }

  toEncodable() {
    return {
      AsteroidBelt: {},
    }
  }
}

export interface GasGiantJSON {
  kind: "GasGiant"
}

export class GasGiant {
  static readonly discriminator = 4
  static readonly kind = "GasGiant"
  readonly discriminator = 4
  readonly kind = "GasGiant"

  toJSON(): GasGiantJSON {
    return {
      kind: "GasGiant",
    }
  }

  toEncodable() {
    return {
      GasGiant: {},
    }
  }
}

export interface IceGiantJSON {
  kind: "IceGiant"
}

export class IceGiant {
  static readonly discriminator = 5
  static readonly kind = "IceGiant"
  readonly discriminator = 5
  readonly kind = "IceGiant"

  toJSON(): IceGiantJSON {
    return {
      kind: "IceGiant",
    }
  }

  toEncodable() {
    return {
      IceGiant: {},
    }
  }
}

export interface DarkJSON {
  kind: "Dark"
}

export class Dark {
  static readonly discriminator = 6
  static readonly kind = "Dark"
  readonly discriminator = 6
  readonly kind = "Dark"

  toJSON(): DarkJSON {
    return {
      kind: "Dark",
    }
  }

  toEncodable() {
    return {
      Dark: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.PlanetTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Terrestrial" in obj) {
    return new Terrestrial()
  }
  if ("Volcanic" in obj) {
    return new Volcanic()
  }
  if ("Barren" in obj) {
    return new Barren()
  }
  if ("AsteroidBelt" in obj) {
    return new AsteroidBelt()
  }
  if ("GasGiant" in obj) {
    return new GasGiant()
  }
  if ("IceGiant" in obj) {
    return new IceGiant()
  }
  if ("Dark" in obj) {
    return new Dark()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.PlanetTypeJSON): types.PlanetTypeKind {
  switch (obj.kind) {
    case "Terrestrial": {
      return new Terrestrial()
    }
    case "Volcanic": {
      return new Volcanic()
    }
    case "Barren": {
      return new Barren()
    }
    case "AsteroidBelt": {
      return new AsteroidBelt()
    }
    case "GasGiant": {
      return new GasGiant()
    }
    case "IceGiant": {
      return new IceGiant()
    }
    case "Dark": {
      return new Dark()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Terrestrial"),
    borsh.struct([], "Volcanic"),
    borsh.struct([], "Barren"),
    borsh.struct([], "AsteroidBelt"),
    borsh.struct([], "GasGiant"),
    borsh.struct([], "IceGiant"),
    borsh.struct([], "Dark"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
