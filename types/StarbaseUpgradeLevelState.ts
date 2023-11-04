import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NotStartedJSON {
  kind: "NotStarted"
}

export class NotStarted {
  static readonly discriminator = 0
  static readonly kind = "NotStarted"
  readonly discriminator = 0
  readonly kind = "NotStarted"

  toJSON(): NotStartedJSON {
    return {
      kind: "NotStarted",
    }
  }

  toEncodable() {
    return {
      NotStarted: {},
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

export type FinishedFields = {
  /** Timestamp of the upgrade completion */
  timestamp: BN
}
export type FinishedValue = {
  /** Timestamp of the upgrade completion */
  timestamp: BN
}

export interface FinishedJSON {
  kind: "Finished"
  value: {
    /** Timestamp of the upgrade completion */
    timestamp: string
  }
}

export class Finished {
  static readonly discriminator = 2
  static readonly kind = "Finished"
  readonly discriminator = 2
  readonly kind = "Finished"
  readonly value: FinishedValue

  constructor(value: FinishedFields) {
    this.value = {
      timestamp: value.timestamp,
    }
  }

  toJSON(): FinishedJSON {
    return {
      kind: "Finished",
      value: {
        timestamp: this.value.timestamp.toString(),
      },
    }
  }

  toEncodable() {
    return {
      Finished: {
        timestamp: this.value.timestamp,
      },
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.StarbaseUpgradeLevelStateKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("NotStarted" in obj) {
    return new NotStarted()
  }
  if ("Started" in obj) {
    return new Started()
  }
  if ("Finished" in obj) {
    const val = obj["Finished"]
    return new Finished({
      timestamp: val["timestamp"],
    })
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(
  obj: types.StarbaseUpgradeLevelStateJSON
): types.StarbaseUpgradeLevelStateKind {
  switch (obj.kind) {
    case "NotStarted": {
      return new NotStarted()
    }
    case "Started": {
      return new Started()
    }
    case "Finished": {
      return new Finished({
        timestamp: new BN(obj.value.timestamp),
      })
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "NotStarted"),
    borsh.struct([], "Started"),
    borsh.struct([borsh.i64("timestamp")], "Finished"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
