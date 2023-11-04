import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface WhiteDwarfJSON {
  kind: "WhiteDwarf"
}

export class WhiteDwarf {
  static readonly discriminator = 0
  static readonly kind = "WhiteDwarf"
  readonly discriminator = 0
  readonly kind = "WhiteDwarf"

  toJSON(): WhiteDwarfJSON {
    return {
      kind: "WhiteDwarf",
    }
  }

  toEncodable() {
    return {
      WhiteDwarf: {},
    }
  }
}

export interface RedDwarfJSON {
  kind: "RedDwarf"
}

export class RedDwarf {
  static readonly discriminator = 1
  static readonly kind = "RedDwarf"
  readonly discriminator = 1
  readonly kind = "RedDwarf"

  toJSON(): RedDwarfJSON {
    return {
      kind: "RedDwarf",
    }
  }

  toEncodable() {
    return {
      RedDwarf: {},
    }
  }
}

export interface SolarJSON {
  kind: "Solar"
}

export class Solar {
  static readonly discriminator = 2
  static readonly kind = "Solar"
  readonly discriminator = 2
  readonly kind = "Solar"

  toJSON(): SolarJSON {
    return {
      kind: "Solar",
    }
  }

  toEncodable() {
    return {
      Solar: {},
    }
  }
}

export interface HotBlueJSON {
  kind: "HotBlue"
}

export class HotBlue {
  static readonly discriminator = 3
  static readonly kind = "HotBlue"
  readonly discriminator = 3
  readonly kind = "HotBlue"

  toJSON(): HotBlueJSON {
    return {
      kind: "HotBlue",
    }
  }

  toEncodable() {
    return {
      HotBlue: {},
    }
  }
}

export interface RedGiantJSON {
  kind: "RedGiant"
}

export class RedGiant {
  static readonly discriminator = 4
  static readonly kind = "RedGiant"
  readonly discriminator = 4
  readonly kind = "RedGiant"

  toJSON(): RedGiantJSON {
    return {
      kind: "RedGiant",
    }
  }

  toEncodable() {
    return {
      RedGiant: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.StarTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("WhiteDwarf" in obj) {
    return new WhiteDwarf()
  }
  if ("RedDwarf" in obj) {
    return new RedDwarf()
  }
  if ("Solar" in obj) {
    return new Solar()
  }
  if ("HotBlue" in obj) {
    return new HotBlue()
  }
  if ("RedGiant" in obj) {
    return new RedGiant()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.StarTypeJSON): types.StarTypeKind {
  switch (obj.kind) {
    case "WhiteDwarf": {
      return new WhiteDwarf()
    }
    case "RedDwarf": {
      return new RedDwarf()
    }
    case "Solar": {
      return new Solar()
    }
    case "HotBlue": {
      return new HotBlue()
    }
    case "RedGiant": {
      return new RedGiant()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "WhiteDwarf"),
    borsh.struct([], "RedDwarf"),
    borsh.struct([], "Solar"),
    borsh.struct([], "HotBlue"),
    borsh.struct([], "RedGiant"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
