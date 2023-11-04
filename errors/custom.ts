export type CustomError =
  | IncorrectAdminAddress
  | MissingRemainingAccount
  | NoStargateConnectionsAvailable
  | StargatesNotConnected
  | InvalidPlanetType
  | InvalidRingType
  | InvalidStarType
  | InvalidOrInactiveGame
  | InvalidShipSizeClass
  | IncorrectAccountSize
  | UpdateIdMismatch
  | AlreadyActive
  | InactiveAccount
  | InvalidGame
  | InvalidGameState
  | InvalidSector
  | IncorrectVarsAccountAddress
  | InsufficientFuel
  | DistanceGreaterThanMax
  | NumericOverflow
  | InvalidLocationType
  | LocationTypeNotSupported
  | IncorrectMineItem
  | IncorrectAuthorityAddress
  | IncorrectResourceAddress
  | IncorrectMintAuthority
  | MintAuthorityIsNone
  | InvalidCurrentFleetState
  | InvalidCurrentStarbaseState
  | AuthorityMismatch
  | MintMismatch
  | TokenMismatch
  | OwnerMismatch
  | GameMismatch
  | ProfileMismatch
  | SagePlayerProfileMismatch
  | StarbaseMismatch
  | FactionMismatch
  | SeqIdMismatch
  | ShipMismatch
  | CargoPodMismatch
  | PlanetMismatch
  | MineItemMismatch
  | LocationMismatch
  | InvalidEscrowKey
  | InvalidShipAmount
  | InvalidShipHangarSpaceAmount
  | InvalidCrewAmount
  | InvalidState
  | InvalidDistance
  | NotAtCentralSpaceStation
  | ShipNotExpected
  | AddressMismatch
  | InvalidSectorConnection
  | InvalidStarbaseLevel
  | InvalidStarbaseUpgradeRecipeCategory
  | HangarUpgradeNotPossible
  | DisbandedFleetNotEmpty
  | FaultyMovement
  | IncorrectHandleRawAccount
  | InsufficientShipCargoCapacity
  | FleetDoesNotNeedUpdate
  | MustDisbandFleet
  | CannotForceDisbandFleet
  | ShipMismatchOrAlreadyUpdated
  | ShipAlreadyUpdated
  | InvalidNextShipAddress
  | InvalidShipForForcedDisband
  | InvalidWarpRange
  | InvalidIngredient
  | StarbaseUpgradeNotInProgress
  | FleetNotInQueue
  | NeedCleanStarbaseUpgradeQueue
  | PlanetNotReachable
  | RespawnNotPossible
  | InvalidMovement
  | CargoAmountAboveZero
  | InvalidCargoPod
  | InvalidZoneCoordinates
  | RespawnTimeNotElapsed
  | ActiveAccount
  | StarbasePlayerMismatch
  | AlreadyProcessed
  | InvalidAmount
  | WarpIsOnCooldown
  | ProgramMismatch
  | MustBeOnlyInstruction
  | InvalidTime
  | ScanIsOnCooldown
  | InvalidFleetSize
  | InactiveFeature
  | ZeroShipsAdded
  | GenericInvalid

export class IncorrectAdminAddress extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "IncorrectAdminAddress"
  readonly msg = "Incorrect admin address."

  constructor(readonly logs?: string[]) {
    super("6000: Incorrect admin address.")
  }
}

export class MissingRemainingAccount extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "MissingRemainingAccount"
  readonly msg = "An expected remaining account is missing."

  constructor(readonly logs?: string[]) {
    super("6001: An expected remaining account is missing.")
  }
}

export class NoStargateConnectionsAvailable extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "NoStargateConnectionsAvailable"
  readonly msg = "No Stargate connections available."

  constructor(readonly logs?: string[]) {
    super("6002: No Stargate connections available.")
  }
}

export class StargatesNotConnected extends Error {
  static readonly code = 6003
  readonly code = 6003
  readonly name = "StargatesNotConnected"
  readonly msg = "The provided Stargates are not connected."

  constructor(readonly logs?: string[]) {
    super("6003: The provided Stargates are not connected.")
  }
}

export class InvalidPlanetType extends Error {
  static readonly code = 6004
  readonly code = 6004
  readonly name = "InvalidPlanetType"
  readonly msg = "Invalid Planet Type."

  constructor(readonly logs?: string[]) {
    super("6004: Invalid Planet Type.")
  }
}

export class InvalidRingType extends Error {
  static readonly code = 6005
  readonly code = 6005
  readonly name = "InvalidRingType"
  readonly msg = "Invalid Ring Type."

  constructor(readonly logs?: string[]) {
    super("6005: Invalid Ring Type.")
  }
}

export class InvalidStarType extends Error {
  static readonly code = 6006
  readonly code = 6006
  readonly name = "InvalidStarType"
  readonly msg = "Invalid Star Type."

  constructor(readonly logs?: string[]) {
    super("6006: Invalid Star Type.")
  }
}

export class InvalidOrInactiveGame extends Error {
  static readonly code = 6007
  readonly code = 6007
  readonly name = "InvalidOrInactiveGame"
  readonly msg = "Invalid Or Inactive Game"

  constructor(readonly logs?: string[]) {
    super("6007: Invalid Or Inactive Game")
  }
}

export class InvalidShipSizeClass extends Error {
  static readonly code = 6008
  readonly code = 6008
  readonly name = "InvalidShipSizeClass"
  readonly msg = "Invalid Ship Size Class."

  constructor(readonly logs?: string[]) {
    super("6008: Invalid Ship Size Class.")
  }
}

export class IncorrectAccountSize extends Error {
  static readonly code = 6009
  readonly code = 6009
  readonly name = "IncorrectAccountSize"
  readonly msg = "Incorrect Account Size."

  constructor(readonly logs?: string[]) {
    super("6009: Incorrect Account Size.")
  }
}

export class UpdateIdMismatch extends Error {
  static readonly code = 6010
  readonly code = 6010
  readonly name = "UpdateIdMismatch"
  readonly msg = "The update_id is mismatched."

  constructor(readonly logs?: string[]) {
    super("6010: The update_id is mismatched.")
  }
}

export class AlreadyActive extends Error {
  static readonly code = 6011
  readonly code = 6011
  readonly name = "AlreadyActive"
  readonly msg = "The account is already active."

  constructor(readonly logs?: string[]) {
    super("6011: The account is already active.")
  }
}

export class InactiveAccount extends Error {
  static readonly code = 6012
  readonly code = 6012
  readonly name = "InactiveAccount"
  readonly msg = "The account is inactive."

  constructor(readonly logs?: string[]) {
    super("6012: The account is inactive.")
  }
}

export class InvalidGame extends Error {
  static readonly code = 6013
  readonly code = 6013
  readonly name = "InvalidGame"
  readonly msg = "The game account is invalid."

  constructor(readonly logs?: string[]) {
    super("6013: The game account is invalid.")
  }
}

export class InvalidGameState extends Error {
  static readonly code = 6014
  readonly code = 6014
  readonly name = "InvalidGameState"
  readonly msg = "The game state account is invalid."

  constructor(readonly logs?: string[]) {
    super("6014: The game state account is invalid.")
  }
}

export class InvalidSector extends Error {
  static readonly code = 6015
  readonly code = 6015
  readonly name = "InvalidSector"
  readonly msg = "The sector account is invalid."

  constructor(readonly logs?: string[]) {
    super("6015: The sector account is invalid.")
  }
}

export class IncorrectVarsAccountAddress extends Error {
  static readonly code = 6016
  readonly code = 6016
  readonly name = "IncorrectVarsAccountAddress"
  readonly msg = "Incorrect sage game_id account address."

  constructor(readonly logs?: string[]) {
    super("6016: Incorrect sage game_id account address.")
  }
}

export class InsufficientFuel extends Error {
  static readonly code = 6017
  readonly code = 6017
  readonly name = "InsufficientFuel"
  readonly msg = "Insufficient Fuel to complete movement"

  constructor(readonly logs?: string[]) {
    super("6017: Insufficient Fuel to complete movement")
  }
}

export class DistanceGreaterThanMax extends Error {
  static readonly code = 6018
  readonly code = 6018
  readonly name = "DistanceGreaterThanMax"
  readonly msg = "Distance of movement is greater than the allowed maximum"

  constructor(readonly logs?: string[]) {
    super("6018: Distance of movement is greater than the allowed maximum")
  }
}

export class NumericOverflow extends Error {
  static readonly code = 6019
  readonly code = 6019
  readonly name = "NumericOverflow"
  readonly msg = "Numeric overflow"

  constructor(readonly logs?: string[]) {
    super("6019: Numeric overflow")
  }
}

export class InvalidLocationType extends Error {
  static readonly code = 6020
  readonly code = 6020
  readonly name = "InvalidLocationType"
  readonly msg = "Invalid Location Type."

  constructor(readonly logs?: string[]) {
    super("6020: Invalid Location Type.")
  }
}

export class LocationTypeNotSupported extends Error {
  static readonly code = 6021
  readonly code = 6021
  readonly name = "LocationTypeNotSupported"
  readonly msg = "The provided location type is not supported."

  constructor(readonly logs?: string[]) {
    super("6021: The provided location type is not supported.")
  }
}

export class IncorrectMineItem extends Error {
  static readonly code = 6022
  readonly code = 6022
  readonly name = "IncorrectMineItem"
  readonly msg = "Incorrect mine item address."

  constructor(readonly logs?: string[]) {
    super("6022: Incorrect mine item address.")
  }
}

export class IncorrectAuthorityAddress extends Error {
  static readonly code = 6023
  readonly code = 6023
  readonly name = "IncorrectAuthorityAddress"
  readonly msg = "Incorrect authority address."

  constructor(readonly logs?: string[]) {
    super("6023: Incorrect authority address.")
  }
}

export class IncorrectResourceAddress extends Error {
  static readonly code = 6024
  readonly code = 6024
  readonly name = "IncorrectResourceAddress"
  readonly msg = "Incorrect resource address."

  constructor(readonly logs?: string[]) {
    super("6024: Incorrect resource address.")
  }
}

export class IncorrectMintAuthority extends Error {
  static readonly code = 6025
  readonly code = 6025
  readonly name = "IncorrectMintAuthority"
  readonly msg = "Incorrect mint authority."

  constructor(readonly logs?: string[]) {
    super("6025: Incorrect mint authority.")
  }
}

export class MintAuthorityIsNone extends Error {
  static readonly code = 6026
  readonly code = 6026
  readonly name = "MintAuthorityIsNone"
  readonly msg = "The mint authority should exist."

  constructor(readonly logs?: string[]) {
    super("6026: The mint authority should exist.")
  }
}

export class InvalidCurrentFleetState extends Error {
  static readonly code = 6027
  readonly code = 6027
  readonly name = "InvalidCurrentFleetState"
  readonly msg = "The current fleet state is not valid."

  constructor(readonly logs?: string[]) {
    super("6027: The current fleet state is not valid.")
  }
}

export class InvalidCurrentStarbaseState extends Error {
  static readonly code = 6028
  readonly code = 6028
  readonly name = "InvalidCurrentStarbaseState"
  readonly msg = "The current starbase state is not valid."

  constructor(readonly logs?: string[]) {
    super("6028: The current starbase state is not valid.")
  }
}

export class AuthorityMismatch extends Error {
  static readonly code = 6029
  readonly code = 6029
  readonly name = "AuthorityMismatch"
  readonly msg = "Authority mismatch"

  constructor(readonly logs?: string[]) {
    super("6029: Authority mismatch")
  }
}

export class MintMismatch extends Error {
  static readonly code = 6030
  readonly code = 6030
  readonly name = "MintMismatch"
  readonly msg = "Mint mismatch"

  constructor(readonly logs?: string[]) {
    super("6030: Mint mismatch")
  }
}

export class TokenMismatch extends Error {
  static readonly code = 6031
  readonly code = 6031
  readonly name = "TokenMismatch"
  readonly msg = "Incorrect token address."

  constructor(readonly logs?: string[]) {
    super("6031: Incorrect token address.")
  }
}

export class OwnerMismatch extends Error {
  static readonly code = 6032
  readonly code = 6032
  readonly name = "OwnerMismatch"
  readonly msg = "Owner mismatch"

  constructor(readonly logs?: string[]) {
    super("6032: Owner mismatch")
  }
}

export class GameMismatch extends Error {
  static readonly code = 6033
  readonly code = 6033
  readonly name = "GameMismatch"
  readonly msg = "Game ID mismatch"

  constructor(readonly logs?: string[]) {
    super("6033: Game ID mismatch")
  }
}

export class ProfileMismatch extends Error {
  static readonly code = 6034
  readonly code = 6034
  readonly name = "ProfileMismatch"
  readonly msg = "Profile mismatch"

  constructor(readonly logs?: string[]) {
    super("6034: Profile mismatch")
  }
}

export class SagePlayerProfileMismatch extends Error {
  static readonly code = 6035
  readonly code = 6035
  readonly name = "SagePlayerProfileMismatch"
  readonly msg = "SagePlayerProfile mismatch"

  constructor(readonly logs?: string[]) {
    super("6035: SagePlayerProfile mismatch")
  }
}

export class StarbaseMismatch extends Error {
  static readonly code = 6036
  readonly code = 6036
  readonly name = "StarbaseMismatch"
  readonly msg = "Starbase mismatch"

  constructor(readonly logs?: string[]) {
    super("6036: Starbase mismatch")
  }
}

export class FactionMismatch extends Error {
  static readonly code = 6037
  readonly code = 6037
  readonly name = "FactionMismatch"
  readonly msg = "Faction mismatch"

  constructor(readonly logs?: string[]) {
    super("6037: Faction mismatch")
  }
}

export class SeqIdMismatch extends Error {
  static readonly code = 6038
  readonly code = 6038
  readonly name = "SeqIdMismatch"
  readonly msg = "Sequence id mismatch"

  constructor(readonly logs?: string[]) {
    super("6038: Sequence id mismatch")
  }
}

export class ShipMismatch extends Error {
  static readonly code = 6039
  readonly code = 6039
  readonly name = "ShipMismatch"
  readonly msg = "Ship mismatch"

  constructor(readonly logs?: string[]) {
    super("6039: Ship mismatch")
  }
}

export class CargoPodMismatch extends Error {
  static readonly code = 6040
  readonly code = 6040
  readonly name = "CargoPodMismatch"
  readonly msg = "Cargo Pod mismatch"

  constructor(readonly logs?: string[]) {
    super("6040: Cargo Pod mismatch")
  }
}

export class PlanetMismatch extends Error {
  static readonly code = 6041
  readonly code = 6041
  readonly name = "PlanetMismatch"
  readonly msg = "Planet mismatch"

  constructor(readonly logs?: string[]) {
    super("6041: Planet mismatch")
  }
}

export class MineItemMismatch extends Error {
  static readonly code = 6042
  readonly code = 6042
  readonly name = "MineItemMismatch"
  readonly msg = "MineItem mismatch"

  constructor(readonly logs?: string[]) {
    super("6042: MineItem mismatch")
  }
}

export class LocationMismatch extends Error {
  static readonly code = 6043
  readonly code = 6043
  readonly name = "LocationMismatch"
  readonly msg = "Location mismatch"

  constructor(readonly logs?: string[]) {
    super("6043: Location mismatch")
  }
}

export class InvalidEscrowKey extends Error {
  static readonly code = 6044
  readonly code = 6044
  readonly name = "InvalidEscrowKey"
  readonly msg = "Escrow key not found in remaining data"

  constructor(readonly logs?: string[]) {
    super("6044: Escrow key not found in remaining data")
  }
}

export class InvalidShipAmount extends Error {
  static readonly code = 6045
  readonly code = 6045
  readonly name = "InvalidShipAmount"
  readonly msg = "Insufficient Ship token amount"

  constructor(readonly logs?: string[]) {
    super("6045: Insufficient Ship token amount")
  }
}

export class InvalidShipHangarSpaceAmount extends Error {
  static readonly code = 6046
  readonly code = 6046
  readonly name = "InvalidShipHangarSpaceAmount"
  readonly msg = "Insufficient Ship hangar space amount"

  constructor(readonly logs?: string[]) {
    super("6046: Insufficient Ship hangar space amount")
  }
}

export class InvalidCrewAmount extends Error {
  static readonly code = 6047
  readonly code = 6047
  readonly name = "InvalidCrewAmount"
  readonly msg = "Invalid crew amount"

  constructor(readonly logs?: string[]) {
    super("6047: Invalid crew amount")
  }
}

export class InvalidState extends Error {
  static readonly code = 6048
  readonly code = 6048
  readonly name = "InvalidState"
  readonly msg = "Invalid state"

  constructor(readonly logs?: string[]) {
    super("6048: Invalid state")
  }
}

export class InvalidDistance extends Error {
  static readonly code = 6049
  readonly code = 6049
  readonly name = "InvalidDistance"
  readonly msg = "Invalid distance"

  constructor(readonly logs?: string[]) {
    super("6049: Invalid distance")
  }
}

export class NotAtCentralSpaceStation extends Error {
  static readonly code = 6050
  readonly code = 6050
  readonly name = "NotAtCentralSpaceStation"
  readonly msg = "Not at central space station"

  constructor(readonly logs?: string[]) {
    super("6050: Not at central space station")
  }
}

export class ShipNotExpected extends Error {
  static readonly code = 6051
  readonly code = 6051
  readonly name = "ShipNotExpected"
  readonly msg = "The instruction does not expect a ship account"

  constructor(readonly logs?: string[]) {
    super("6051: The instruction does not expect a ship account")
  }
}

export class AddressMismatch extends Error {
  static readonly code = 6052
  readonly code = 6052
  readonly name = "AddressMismatch"
  readonly msg = "Address mismatch"

  constructor(readonly logs?: string[]) {
    super("6052: Address mismatch")
  }
}

export class InvalidSectorConnection extends Error {
  static readonly code = 6053
  readonly code = 6053
  readonly name = "InvalidSectorConnection"
  readonly msg = "Invalid sector connection"

  constructor(readonly logs?: string[]) {
    super("6053: Invalid sector connection")
  }
}

export class InvalidStarbaseLevel extends Error {
  static readonly code = 6054
  readonly code = 6054
  readonly name = "InvalidStarbaseLevel"
  readonly msg = "Invalid Starbase level"

  constructor(readonly logs?: string[]) {
    super("6054: Invalid Starbase level")
  }
}

export class InvalidStarbaseUpgradeRecipeCategory extends Error {
  static readonly code = 6055
  readonly code = 6055
  readonly name = "InvalidStarbaseUpgradeRecipeCategory"
  readonly msg = "Invalid Starbase upgrade recipe category"

  constructor(readonly logs?: string[]) {
    super("6055: Invalid Starbase upgrade recipe category")
  }
}

export class HangarUpgradeNotPossible extends Error {
  static readonly code = 6056
  readonly code = 6056
  readonly name = "HangarUpgradeNotPossible"
  readonly msg = "Hangar upgrade not Possible"

  constructor(readonly logs?: string[]) {
    super("6056: Hangar upgrade not Possible")
  }
}

export class DisbandedFleetNotEmpty extends Error {
  static readonly code = 6057
  readonly code = 6057
  readonly name = "DisbandedFleetNotEmpty"
  readonly msg = "Disbanded fleet not empty"

  constructor(readonly logs?: string[]) {
    super("6057: Disbanded fleet not empty")
  }
}

export class FaultyMovement extends Error {
  static readonly code = 6058
  readonly code = 6058
  readonly name = "FaultyMovement"
  readonly msg = "Faulty movement"

  constructor(readonly logs?: string[]) {
    super("6058: Faulty movement")
  }
}

export class IncorrectHandleRawAccount extends Error {
  static readonly code = 6059
  readonly code = 6059
  readonly name = "IncorrectHandleRawAccount"
  readonly msg = "Incorrect Account Type for Handle Raw"

  constructor(readonly logs?: string[]) {
    super("6059: Incorrect Account Type for Handle Raw")
  }
}

export class InsufficientShipCargoCapacity extends Error {
  static readonly code = 6060
  readonly code = 6060
  readonly name = "InsufficientShipCargoCapacity"
  readonly msg = "Insufficient Ship Cargo Capacity"

  constructor(readonly logs?: string[]) {
    super("6060: Insufficient Ship Cargo Capacity")
  }
}

export class FleetDoesNotNeedUpdate extends Error {
  static readonly code = 6061
  readonly code = 6061
  readonly name = "FleetDoesNotNeedUpdate"
  readonly msg = "Fleet does not need update"

  constructor(readonly logs?: string[]) {
    super("6061: Fleet does not need update")
  }
}

export class MustDisbandFleet extends Error {
  static readonly code = 6062
  readonly code = 6062
  readonly name = "MustDisbandFleet"
  readonly msg = "Must disband fleet"

  constructor(readonly logs?: string[]) {
    super("6062: Must disband fleet")
  }
}

export class CannotForceDisbandFleet extends Error {
  static readonly code = 6063
  readonly code = 6063
  readonly name = "CannotForceDisbandFleet"
  readonly msg = "Cannot force-disband fleet"

  constructor(readonly logs?: string[]) {
    super("6063: Cannot force-disband fleet")
  }
}

export class ShipMismatchOrAlreadyUpdated extends Error {
  static readonly code = 6064
  readonly code = 6064
  readonly name = "ShipMismatchOrAlreadyUpdated"
  readonly msg = "Ship mismatch or already updated"

  constructor(readonly logs?: string[]) {
    super("6064: Ship mismatch or already updated")
  }
}

export class ShipAlreadyUpdated extends Error {
  static readonly code = 6065
  readonly code = 6065
  readonly name = "ShipAlreadyUpdated"
  readonly msg = "Ship already updated"

  constructor(readonly logs?: string[]) {
    super("6065: Ship already updated")
  }
}

export class InvalidNextShipAddress extends Error {
  static readonly code = 6066
  readonly code = 6066
  readonly name = "InvalidNextShipAddress"
  readonly msg = "Invalid next ship address"

  constructor(readonly logs?: string[]) {
    super("6066: Invalid next ship address")
  }
}

export class InvalidShipForForcedDisband extends Error {
  static readonly code = 6067
  readonly code = 6067
  readonly name = "InvalidShipForForcedDisband"
  readonly msg = "Ship is not valid for forced disband of fleet"

  constructor(readonly logs?: string[]) {
    super("6067: Ship is not valid for forced disband of fleet")
  }
}

export class InvalidWarpRange extends Error {
  static readonly code = 6068
  readonly code = 6068
  readonly name = "InvalidWarpRange"
  readonly msg = "Warp range exceeded"

  constructor(readonly logs?: string[]) {
    super("6068: Warp range exceeded")
  }
}

export class InvalidIngredient extends Error {
  static readonly code = 6069
  readonly code = 6069
  readonly name = "InvalidIngredient"
  readonly msg = "Invalid Ingredient"

  constructor(readonly logs?: string[]) {
    super("6069: Invalid Ingredient")
  }
}

export class StarbaseUpgradeNotInProgress extends Error {
  static readonly code = 6070
  readonly code = 6070
  readonly name = "StarbaseUpgradeNotInProgress"
  readonly msg = "Starbase Upgrade Not in progress"

  constructor(readonly logs?: string[]) {
    super("6070: Starbase Upgrade Not in progress")
  }
}

export class FleetNotInQueue extends Error {
  static readonly code = 6071
  readonly code = 6071
  readonly name = "FleetNotInQueue"
  readonly msg = "Fleet Not in queue"

  constructor(readonly logs?: string[]) {
    super("6071: Fleet Not in queue")
  }
}

export class NeedCleanStarbaseUpgradeQueue extends Error {
  static readonly code = 6072
  readonly code = 6072
  readonly name = "NeedCleanStarbaseUpgradeQueue"
  readonly msg = "Need to clean Starbase upgrade queue"

  constructor(readonly logs?: string[]) {
    super("6072: Need to clean Starbase upgrade queue")
  }
}

export class PlanetNotReachable extends Error {
  static readonly code = 6073
  readonly code = 6073
  readonly name = "PlanetNotReachable"
  readonly msg = "Planet Not Reachable"

  constructor(readonly logs?: string[]) {
    super("6073: Planet Not Reachable")
  }
}

export class RespawnNotPossible extends Error {
  static readonly code = 6074
  readonly code = 6074
  readonly name = "RespawnNotPossible"
  readonly msg = "Respawn Not Possible"

  constructor(readonly logs?: string[]) {
    super("6074: Respawn Not Possible")
  }
}

export class InvalidMovement extends Error {
  static readonly code = 6075
  readonly code = 6075
  readonly name = "InvalidMovement"
  readonly msg = "Cannot enter enemy faction's Security Zone"

  constructor(readonly logs?: string[]) {
    super("6075: Cannot enter enemy faction's Security Zone")
  }
}

export class CargoAmountAboveZero extends Error {
  static readonly code = 6076
  readonly code = 6076
  readonly name = "CargoAmountAboveZero"
  readonly msg = "The Cargo Pod contains a non-zero amount of the Cargo Type"

  constructor(readonly logs?: string[]) {
    super("6076: The Cargo Pod contains a non-zero amount of the Cargo Type")
  }
}

export class InvalidCargoPod extends Error {
  static readonly code = 6077
  readonly code = 6077
  readonly name = "InvalidCargoPod"
  readonly msg = "The Cargo Pod is invalid"

  constructor(readonly logs?: string[]) {
    super("6077: The Cargo Pod is invalid")
  }
}

export class InvalidZoneCoordinates extends Error {
  static readonly code = 6078
  readonly code = 6078
  readonly name = "InvalidZoneCoordinates"
  readonly msg = "Invalid Zone Coordinates"

  constructor(readonly logs?: string[]) {
    super("6078: Invalid Zone Coordinates")
  }
}

export class RespawnTimeNotElapsed extends Error {
  static readonly code = 6079
  readonly code = 6079
  readonly name = "RespawnTimeNotElapsed"
  readonly msg = "Respawn time not elapsed"

  constructor(readonly logs?: string[]) {
    super("6079: Respawn time not elapsed")
  }
}

export class ActiveAccount extends Error {
  static readonly code = 6080
  readonly code = 6080
  readonly name = "ActiveAccount"
  readonly msg = "The Account is Active"

  constructor(readonly logs?: string[]) {
    super("6080: The Account is Active")
  }
}

export class StarbasePlayerMismatch extends Error {
  static readonly code = 6081
  readonly code = 6081
  readonly name = "StarbasePlayerMismatch"
  readonly msg = "Starbase Player mismatch"

  constructor(readonly logs?: string[]) {
    super("6081: Starbase Player mismatch")
  }
}

export class AlreadyProcessed extends Error {
  static readonly code = 6082
  readonly code = 6082
  readonly name = "AlreadyProcessed"
  readonly msg = "The account has already been processed"

  constructor(readonly logs?: string[]) {
    super("6082: The account has already been processed")
  }
}

export class InvalidAmount extends Error {
  static readonly code = 6083
  readonly code = 6083
  readonly name = "InvalidAmount"
  readonly msg = "The amount is invalid"

  constructor(readonly logs?: string[]) {
    super("6083: The amount is invalid")
  }
}

export class WarpIsOnCooldown extends Error {
  static readonly code = 6084
  readonly code = 6084
  readonly name = "WarpIsOnCooldown"
  readonly msg = "Warp is on cooldown"

  constructor(readonly logs?: string[]) {
    super("6084: Warp is on cooldown")
  }
}

export class ProgramMismatch extends Error {
  static readonly code = 6085
  readonly code = 6085
  readonly name = "ProgramMismatch"
  readonly msg = "Program Mismatch"

  constructor(readonly logs?: string[]) {
    super("6085: Program Mismatch")
  }
}

export class MustBeOnlyInstruction extends Error {
  static readonly code = 6086
  readonly code = 6086
  readonly name = "MustBeOnlyInstruction"
  readonly msg = "Current Instruction Is Not Only Instruction"

  constructor(readonly logs?: string[]) {
    super("6086: Current Instruction Is Not Only Instruction")
  }
}

export class InvalidTime extends Error {
  static readonly code = 6087
  readonly code = 6087
  readonly name = "InvalidTime"
  readonly msg = "Invalid Time"

  constructor(readonly logs?: string[]) {
    super("6087: Invalid Time")
  }
}

export class ScanIsOnCooldown extends Error {
  static readonly code = 6088
  readonly code = 6088
  readonly name = "ScanIsOnCooldown"
  readonly msg = "Scanning is on cooldown"

  constructor(readonly logs?: string[]) {
    super("6088: Scanning is on cooldown")
  }
}

export class InvalidFleetSize extends Error {
  static readonly code = 6089
  readonly code = 6089
  readonly name = "InvalidFleetSize"
  readonly msg = "Invalid Fleet Size"

  constructor(readonly logs?: string[]) {
    super("6089: Invalid Fleet Size")
  }
}

export class InactiveFeature extends Error {
  static readonly code = 6090
  readonly code = 6090
  readonly name = "InactiveFeature"
  readonly msg = "The feature is inactive"

  constructor(readonly logs?: string[]) {
    super("6090: The feature is inactive")
  }
}

export class ZeroShipsAdded extends Error {
  static readonly code = 6091
  readonly code = 6091
  readonly name = "ZeroShipsAdded"
  readonly msg = "Zero ships added to fleet"

  constructor(readonly logs?: string[]) {
    super("6091: Zero ships added to fleet")
  }
}

export class GenericInvalid extends Error {
  static readonly code = 6092
  readonly code = 6092
  readonly name = "GenericInvalid"
  readonly msg = "Generic invalid data"

  constructor(readonly logs?: string[]) {
    super("6092: Generic invalid data")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new IncorrectAdminAddress(logs)
    case 6001:
      return new MissingRemainingAccount(logs)
    case 6002:
      return new NoStargateConnectionsAvailable(logs)
    case 6003:
      return new StargatesNotConnected(logs)
    case 6004:
      return new InvalidPlanetType(logs)
    case 6005:
      return new InvalidRingType(logs)
    case 6006:
      return new InvalidStarType(logs)
    case 6007:
      return new InvalidOrInactiveGame(logs)
    case 6008:
      return new InvalidShipSizeClass(logs)
    case 6009:
      return new IncorrectAccountSize(logs)
    case 6010:
      return new UpdateIdMismatch(logs)
    case 6011:
      return new AlreadyActive(logs)
    case 6012:
      return new InactiveAccount(logs)
    case 6013:
      return new InvalidGame(logs)
    case 6014:
      return new InvalidGameState(logs)
    case 6015:
      return new InvalidSector(logs)
    case 6016:
      return new IncorrectVarsAccountAddress(logs)
    case 6017:
      return new InsufficientFuel(logs)
    case 6018:
      return new DistanceGreaterThanMax(logs)
    case 6019:
      return new NumericOverflow(logs)
    case 6020:
      return new InvalidLocationType(logs)
    case 6021:
      return new LocationTypeNotSupported(logs)
    case 6022:
      return new IncorrectMineItem(logs)
    case 6023:
      return new IncorrectAuthorityAddress(logs)
    case 6024:
      return new IncorrectResourceAddress(logs)
    case 6025:
      return new IncorrectMintAuthority(logs)
    case 6026:
      return new MintAuthorityIsNone(logs)
    case 6027:
      return new InvalidCurrentFleetState(logs)
    case 6028:
      return new InvalidCurrentStarbaseState(logs)
    case 6029:
      return new AuthorityMismatch(logs)
    case 6030:
      return new MintMismatch(logs)
    case 6031:
      return new TokenMismatch(logs)
    case 6032:
      return new OwnerMismatch(logs)
    case 6033:
      return new GameMismatch(logs)
    case 6034:
      return new ProfileMismatch(logs)
    case 6035:
      return new SagePlayerProfileMismatch(logs)
    case 6036:
      return new StarbaseMismatch(logs)
    case 6037:
      return new FactionMismatch(logs)
    case 6038:
      return new SeqIdMismatch(logs)
    case 6039:
      return new ShipMismatch(logs)
    case 6040:
      return new CargoPodMismatch(logs)
    case 6041:
      return new PlanetMismatch(logs)
    case 6042:
      return new MineItemMismatch(logs)
    case 6043:
      return new LocationMismatch(logs)
    case 6044:
      return new InvalidEscrowKey(logs)
    case 6045:
      return new InvalidShipAmount(logs)
    case 6046:
      return new InvalidShipHangarSpaceAmount(logs)
    case 6047:
      return new InvalidCrewAmount(logs)
    case 6048:
      return new InvalidState(logs)
    case 6049:
      return new InvalidDistance(logs)
    case 6050:
      return new NotAtCentralSpaceStation(logs)
    case 6051:
      return new ShipNotExpected(logs)
    case 6052:
      return new AddressMismatch(logs)
    case 6053:
      return new InvalidSectorConnection(logs)
    case 6054:
      return new InvalidStarbaseLevel(logs)
    case 6055:
      return new InvalidStarbaseUpgradeRecipeCategory(logs)
    case 6056:
      return new HangarUpgradeNotPossible(logs)
    case 6057:
      return new DisbandedFleetNotEmpty(logs)
    case 6058:
      return new FaultyMovement(logs)
    case 6059:
      return new IncorrectHandleRawAccount(logs)
    case 6060:
      return new InsufficientShipCargoCapacity(logs)
    case 6061:
      return new FleetDoesNotNeedUpdate(logs)
    case 6062:
      return new MustDisbandFleet(logs)
    case 6063:
      return new CannotForceDisbandFleet(logs)
    case 6064:
      return new ShipMismatchOrAlreadyUpdated(logs)
    case 6065:
      return new ShipAlreadyUpdated(logs)
    case 6066:
      return new InvalidNextShipAddress(logs)
    case 6067:
      return new InvalidShipForForcedDisband(logs)
    case 6068:
      return new InvalidWarpRange(logs)
    case 6069:
      return new InvalidIngredient(logs)
    case 6070:
      return new StarbaseUpgradeNotInProgress(logs)
    case 6071:
      return new FleetNotInQueue(logs)
    case 6072:
      return new NeedCleanStarbaseUpgradeQueue(logs)
    case 6073:
      return new PlanetNotReachable(logs)
    case 6074:
      return new RespawnNotPossible(logs)
    case 6075:
      return new InvalidMovement(logs)
    case 6076:
      return new CargoAmountAboveZero(logs)
    case 6077:
      return new InvalidCargoPod(logs)
    case 6078:
      return new InvalidZoneCoordinates(logs)
    case 6079:
      return new RespawnTimeNotElapsed(logs)
    case 6080:
      return new ActiveAccount(logs)
    case 6081:
      return new StarbasePlayerMismatch(logs)
    case 6082:
      return new AlreadyProcessed(logs)
    case 6083:
      return new InvalidAmount(logs)
    case 6084:
      return new WarpIsOnCooldown(logs)
    case 6085:
      return new ProgramMismatch(logs)
    case 6086:
      return new MustBeOnlyInstruction(logs)
    case 6087:
      return new InvalidTime(logs)
    case 6088:
      return new ScanIsOnCooldown(logs)
    case 6089:
      return new InvalidFleetSize(logs)
    case 6090:
      return new InactiveFeature(logs)
    case 6091:
      return new ZeroShipsAdded(logs)
    case 6092:
      return new GenericInvalid(logs)
  }

  return null
}
