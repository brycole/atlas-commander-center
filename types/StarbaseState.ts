import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ActiveJSON {
  kind: "Active"
}

export class Active {
  static readonly discriminator = 0
  static readonly kind = "Active"
  readonly discriminator = 0
  readonly kind = "Active"

  toJSON(): ActiveJSON {
    return {
      kind: "Active",
    }
  }

  toEncodable() {
    return {
      Active: {},
    }
  }
}

export interface DestroyedJSON {
  kind: "Destroyed"
}

export class Destroyed {
  static readonly discriminator = 1
  static readonly kind = "Destroyed"
  readonly discriminator = 1
  readonly kind = "Destroyed"

  toJSON(): DestroyedJSON {
    return {
      kind: "Destroyed",
    }
  }

  toEncodable() {
    return {
      Destroyed: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.StarbaseStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("Active" in obj) {
    return new Active()
  }
  if ("Destroyed" in obj) {
    return new Destroyed()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.StarbaseStateJSON
): types.StarbaseStateKind {
  switch (obj.kind) {
    case "Active": {
      return new Active()
    }
    case "Destroyed": {
      return new Destroyed()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Active"),
    borsh.struct([], "Destroyed"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
