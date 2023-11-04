import * as FleetStarbaseUpgradeState from "./FleetStarbaseUpgradeState"
import * as LocationType from "./LocationType"
import * as PlanetType from "./PlanetType"
import * as SectorRing from "./SectorRing"
import * as SizeClass from "./SizeClass"
import * as StarType from "./StarType"
import * as StarbaseState from "./StarbaseState"
import * as StarbaseUpgradeLevelState from "./StarbaseUpgradeLevelState"

export { AddShipEscrowInput } from "./AddShipEscrowInput"
export type {
  AddShipEscrowInputFields,
  AddShipEscrowInputJSON,
} from "./AddShipEscrowInput"
export { AddShipToFleetInput } from "./AddShipToFleetInput"
export type {
  AddShipToFleetInputFields,
  AddShipToFleetInputJSON,
} from "./AddShipToFleetInput"
export { BaseEmissionsBySizeUtil } from "./BaseEmissionsBySizeUtil"
export type {
  BaseEmissionsBySizeUtilFields,
  BaseEmissionsBySizeUtilJSON,
} from "./BaseEmissionsBySizeUtil"
export { BaseEmissionsBySizeUtilInput } from "./BaseEmissionsBySizeUtilInput"
export type {
  BaseEmissionsBySizeUtilInputFields,
  BaseEmissionsBySizeUtilInputJSON,
} from "./BaseEmissionsBySizeUtilInput"
export { Cargo } from "./Cargo"
export type { CargoFields, CargoJSON } from "./Cargo"
export { CargoStats } from "./CargoStats"
export type { CargoStatsFields, CargoStatsJSON } from "./CargoStats"
export { CargoStatsUnpacked } from "./CargoStatsUnpacked"
export type {
  CargoStatsUnpackedFields,
  CargoStatsUnpackedJSON,
} from "./CargoStatsUnpacked"
export { CargoToGameInput } from "./CargoToGameInput"
export type {
  CargoToGameInputFields,
  CargoToGameInputJSON,
} from "./CargoToGameInput"
export { CloseDisbandedFleetInput } from "./CloseDisbandedFleetInput"
export type {
  CloseDisbandedFleetInputFields,
  CloseDisbandedFleetInputJSON,
} from "./CloseDisbandedFleetInput"
export { Crafting } from "./Crafting"
export type { CraftingFields, CraftingJSON } from "./Crafting"
export { CreateFleetInput } from "./CreateFleetInput"
export type {
  CreateFleetInputFields,
  CreateFleetInputJSON,
} from "./CreateFleetInput"
export { DepositCargoToFleetInput } from "./DepositCargoToFleetInput"
export type {
  DepositCargoToFleetInputFields,
  DepositCargoToFleetInputJSON,
} from "./DepositCargoToFleetInput"
export { DeregisterSurveyDataUnitTrackerInput } from "./DeregisterSurveyDataUnitTrackerInput"
export type {
  DeregisterSurveyDataUnitTrackerInputFields,
  DeregisterSurveyDataUnitTrackerInputJSON,
} from "./DeregisterSurveyDataUnitTrackerInput"
export { DisbandFleetInput } from "./DisbandFleetInput"
export type {
  DisbandFleetInputFields,
  DisbandFleetInputJSON,
} from "./DisbandFleetInput"
export { DisbandedFleetToEscrowInput } from "./DisbandedFleetToEscrowInput"
export type {
  DisbandedFleetToEscrowInputFields,
  DisbandedFleetToEscrowInputJSON,
} from "./DisbandedFleetToEscrowInput"
export { FactionsStarbaseLevelInfo } from "./FactionsStarbaseLevelInfo"
export type {
  FactionsStarbaseLevelInfoFields,
  FactionsStarbaseLevelInfoJSON,
} from "./FactionsStarbaseLevelInfo"
export { FleetInfo } from "./FleetInfo"
export type { FleetInfoFields, FleetInfoJSON } from "./FleetInfo"
export { FleetInput } from "./FleetInput"
export type { FleetInputFields, FleetInputJSON } from "./FleetInput"
export { FleetShipsInfo } from "./FleetShipsInfo"
export type { FleetShipsInfoFields, FleetShipsInfoJSON } from "./FleetShipsInfo"
export { FleetStarbaseUpgradeState }

/** The upgrade start state for a fleet */
export type FleetStarbaseUpgradeStateKind =
  | FleetStarbaseUpgradeState.NotFullyFilled
  | FleetStarbaseUpgradeState.Started
  | FleetStarbaseUpgradeState.Burning
export type FleetStarbaseUpgradeStateJSON =
  | FleetStarbaseUpgradeState.NotFullyFilledJSON
  | FleetStarbaseUpgradeState.StartedJSON
  | FleetStarbaseUpgradeState.BurningJSON

export { FleetsPointModifier } from "./FleetsPointModifier"
export type {
  FleetsPointModifierFields,
  FleetsPointModifierJSON,
} from "./FleetsPointModifier"
export { ForcedDisbandFleetInput } from "./ForcedDisbandFleetInput"
export type {
  ForcedDisbandFleetInputFields,
  ForcedDisbandFleetInputJSON,
} from "./ForcedDisbandFleetInput"
export { Idle } from "./Idle"
export type { IdleFields, IdleJSON } from "./Idle"
export { IdleToRespawnInput } from "./IdleToRespawnInput"
export type {
  IdleToRespawnInputFields,
  IdleToRespawnInputJSON,
} from "./IdleToRespawnInput"
export { InitGameStateInput } from "./InitGameStateInput"
export type {
  InitGameStateInputFields,
  InitGameStateInputJSON,
} from "./InitGameStateInput"
export { KeyIndexInput } from "./KeyIndexInput"
export type { KeyIndexInputFields, KeyIndexInputJSON } from "./KeyIndexInput"
export { Levers } from "./Levers"
export type { LeversFields, LeversJSON } from "./Levers"
export { LeversInput } from "./LeversInput"
export type { LeversInputFields, LeversInputJSON } from "./LeversInput"
export { LocationType }

/** Represents different types of locations that a `Resource` might be found */
export type LocationTypeKind = LocationType.Planet
export type LocationTypeJSON = LocationType.PlanetJSON

export { ManageGameInput } from "./ManageGameInput"
export type {
  ManageGameInputFields,
  ManageGameInputJSON,
} from "./ManageGameInput"
export { MineAsteroid } from "./MineAsteroid"
export type { MineAsteroidFields, MineAsteroidJSON } from "./MineAsteroid"
export { MineAsteroidToRespawnInput } from "./MineAsteroidToRespawnInput"
export type {
  MineAsteroidToRespawnInputFields,
  MineAsteroidToRespawnInputJSON,
} from "./MineAsteroidToRespawnInput"
export { Mints } from "./Mints"
export type { MintsFields, MintsJSON } from "./Mints"
export { MiscStats } from "./MiscStats"
export type { MiscStatsFields, MiscStatsJSON } from "./MiscStats"
export { MiscStatsUnpacked } from "./MiscStatsUnpacked"
export type {
  MiscStatsUnpackedFields,
  MiscStatsUnpackedJSON,
} from "./MiscStatsUnpacked"
export { MiscVariables } from "./MiscVariables"
export type { MiscVariablesFields, MiscVariablesJSON } from "./MiscVariables"
export { MiscVariablesInput } from "./MiscVariablesInput"
export type {
  MiscVariablesInputFields,
  MiscVariablesInputJSON,
} from "./MiscVariablesInput"
export { MoveSubwarp } from "./MoveSubwarp"
export type { MoveSubwarpFields, MoveSubwarpJSON } from "./MoveSubwarp"
export { MoveWarp } from "./MoveWarp"
export type { MoveWarpFields, MoveWarpJSON } from "./MoveWarp"
export { MovementStats } from "./MovementStats"
export type { MovementStatsFields, MovementStatsJSON } from "./MovementStats"
export { MovementStatsUnpacked } from "./MovementStatsUnpacked"
export type {
  MovementStatsUnpackedFields,
  MovementStatsUnpackedJSON,
} from "./MovementStatsUnpacked"
export { OptionalNonSystemPubkey } from "./OptionalNonSystemPubkey"
export type {
  OptionalNonSystemPubkeyFields,
  OptionalNonSystemPubkeyJSON,
} from "./OptionalNonSystemPubkey"
export { PlanetType }

/** Represents different types a `Planet` could be */
export type PlanetTypeKind =
  | PlanetType.Terrestrial
  | PlanetType.Volcanic
  | PlanetType.Barren
  | PlanetType.AsteroidBelt
  | PlanetType.GasGiant
  | PlanetType.IceGiant
  | PlanetType.Dark
export type PlanetTypeJSON =
  | PlanetType.TerrestrialJSON
  | PlanetType.VolcanicJSON
  | PlanetType.BarrenJSON
  | PlanetType.AsteroidBeltJSON
  | PlanetType.GasGiantJSON
  | PlanetType.IceGiantJSON
  | PlanetType.DarkJSON

export { Points } from "./Points"
export type { PointsFields, PointsJSON } from "./Points"
export { RegisterFleetsPointsModifierInput } from "./RegisterFleetsPointsModifierInput"
export type {
  RegisterFleetsPointsModifierInputFields,
  RegisterFleetsPointsModifierInputJSON,
} from "./RegisterFleetsPointsModifierInput"
export { RegisterMineItemInput } from "./RegisterMineItemInput"
export type {
  RegisterMineItemInputFields,
  RegisterMineItemInputJSON,
} from "./RegisterMineItemInput"
export { RegisterPlanetInput } from "./RegisterPlanetInput"
export type {
  RegisterPlanetInputFields,
  RegisterPlanetInputJSON,
} from "./RegisterPlanetInput"
export { RegisterResourceInput } from "./RegisterResourceInput"
export type {
  RegisterResourceInputFields,
  RegisterResourceInputJSON,
} from "./RegisterResourceInput"
export { RegisterShipInput } from "./RegisterShipInput"
export type {
  RegisterShipInputFields,
  RegisterShipInputJSON,
} from "./RegisterShipInput"
export { RegisterStarInput } from "./RegisterStarInput"
export type {
  RegisterStarInputFields,
  RegisterStarInputJSON,
} from "./RegisterStarInput"
export { RegisterStarbaseInput } from "./RegisterStarbaseInput"
export type {
  RegisterStarbaseInputFields,
  RegisterStarbaseInputJSON,
} from "./RegisterStarbaseInput"
export { RegisterStarbaseInputUnpacked } from "./RegisterStarbaseInputUnpacked"
export type {
  RegisterStarbaseInputUnpackedFields,
  RegisterStarbaseInputUnpackedJSON,
} from "./RegisterStarbaseInputUnpacked"
export { RegisterSurveyDataUnitTrackerInput } from "./RegisterSurveyDataUnitTrackerInput"
export type {
  RegisterSurveyDataUnitTrackerInputFields,
  RegisterSurveyDataUnitTrackerInputJSON,
} from "./RegisterSurveyDataUnitTrackerInput"
export { RemoveShipEscrowInput } from "./RemoveShipEscrowInput"
export type {
  RemoveShipEscrowInputFields,
  RemoveShipEscrowInputJSON,
} from "./RemoveShipEscrowInput"
export { Respawn } from "./Respawn"
export type { RespawnFields, RespawnJSON } from "./Respawn"
export { RespawnToLoadingBayInput } from "./RespawnToLoadingBayInput"
export type {
  RespawnToLoadingBayInputFields,
  RespawnToLoadingBayInputJSON,
} from "./RespawnToLoadingBayInput"
export { RiskZoneData } from "./RiskZoneData"
export type { RiskZoneDataFields, RiskZoneDataJSON } from "./RiskZoneData"
export { RiskZoneDataUnpacked } from "./RiskZoneDataUnpacked"
export type {
  RiskZoneDataUnpackedFields,
  RiskZoneDataUnpackedJSON,
} from "./RiskZoneDataUnpacked"
export { RiskZonesData } from "./RiskZonesData"
export type { RiskZonesDataFields, RiskZonesDataJSON } from "./RiskZonesData"
export { RiskZonesDataUnpacked } from "./RiskZonesDataUnpacked"
export type {
  RiskZonesDataUnpackedFields,
  RiskZonesDataUnpackedJSON,
} from "./RiskZonesDataUnpacked"
export { ScanForSurveyDataUnitsInput } from "./ScanForSurveyDataUnitsInput"
export type {
  ScanForSurveyDataUnitsInputFields,
  ScanForSurveyDataUnitsInputJSON,
} from "./ScanForSurveyDataUnitsInput"
export { SectorConnection } from "./SectorConnection"
export type {
  SectorConnectionFields,
  SectorConnectionJSON,
} from "./SectorConnection"
export { SectorRing }

/** Represents the orbital position of a `Planet` in the `Sector` */
export type SectorRingKind =
  | SectorRing.Inner
  | SectorRing.Mid
  | SectorRing.Outer
export type SectorRingJSON =
  | SectorRing.InnerJSON
  | SectorRing.MidJSON
  | SectorRing.OuterJSON

export { ShipCounts } from "./ShipCounts"
export type { ShipCountsFields, ShipCountsJSON } from "./ShipCounts"
export { ShipCountsUnpacked } from "./ShipCountsUnpacked"
export type {
  ShipCountsUnpackedFields,
  ShipCountsUnpackedJSON,
} from "./ShipCountsUnpacked"
export { ShipSizes } from "./ShipSizes"
export type { ShipSizesFields, ShipSizesJSON } from "./ShipSizes"
export { ShipStats } from "./ShipStats"
export type { ShipStatsFields, ShipStatsJSON } from "./ShipStats"
export { ShipStatsUnpacked } from "./ShipStatsUnpacked"
export type {
  ShipStatsUnpackedFields,
  ShipStatsUnpackedJSON,
} from "./ShipStatsUnpacked"
export { SizeClass }

/** Represents different types of Ships */
export type SizeClassKind =
  | SizeClass.XxSmall
  | SizeClass.XSmall
  | SizeClass.Small
  | SizeClass.Medium
  | SizeClass.Large
  | SizeClass.Capital
  | SizeClass.Commander
  | SizeClass.Titan
export type SizeClassJSON =
  | SizeClass.XxSmallJSON
  | SizeClass.XSmallJSON
  | SizeClass.SmallJSON
  | SizeClass.MediumJSON
  | SizeClass.LargeJSON
  | SizeClass.CapitalJSON
  | SizeClass.CommanderJSON
  | SizeClass.TitanJSON

export { StarType }

/** Represents different types of Stars */
export type StarTypeKind =
  | StarType.WhiteDwarf
  | StarType.RedDwarf
  | StarType.Solar
  | StarType.HotBlue
  | StarType.RedGiant
export type StarTypeJSON =
  | StarType.WhiteDwarfJSON
  | StarType.RedDwarfJSON
  | StarType.SolarJSON
  | StarType.HotBlueJSON
  | StarType.RedGiantJSON

export { StarbaseCancelCraftingProcessInput } from "./StarbaseCancelCraftingProcessInput"
export type {
  StarbaseCancelCraftingProcessInputFields,
  StarbaseCancelCraftingProcessInputJSON,
} from "./StarbaseCancelCraftingProcessInput"
export { StarbaseClaimCraftingNonConsumablesInput } from "./StarbaseClaimCraftingNonConsumablesInput"
export type {
  StarbaseClaimCraftingNonConsumablesInputFields,
  StarbaseClaimCraftingNonConsumablesInputJSON,
} from "./StarbaseClaimCraftingNonConsumablesInput"
export { StarbaseClaimCraftingOutputInput } from "./StarbaseClaimCraftingOutputInput"
export type {
  StarbaseClaimCraftingOutputInputFields,
  StarbaseClaimCraftingOutputInputJSON,
} from "./StarbaseClaimCraftingOutputInput"
export { StarbaseCloseCraftingProcessInput } from "./StarbaseCloseCraftingProcessInput"
export type {
  StarbaseCloseCraftingProcessInputFields,
  StarbaseCloseCraftingProcessInputJSON,
} from "./StarbaseCloseCraftingProcessInput"
export { StarbaseCreateCargoPodInput } from "./StarbaseCreateCargoPodInput"
export type {
  StarbaseCreateCargoPodInputFields,
  StarbaseCreateCargoPodInputJSON,
} from "./StarbaseCreateCargoPodInput"
export { StarbaseCreateCraftingProcessInput } from "./StarbaseCreateCraftingProcessInput"
export type {
  StarbaseCreateCraftingProcessInputFields,
  StarbaseCreateCraftingProcessInputJSON,
} from "./StarbaseCreateCraftingProcessInput"
export { StarbaseDepositCraftingIngredientInput } from "./StarbaseDepositCraftingIngredientInput"
export type {
  StarbaseDepositCraftingIngredientInputFields,
  StarbaseDepositCraftingIngredientInputJSON,
} from "./StarbaseDepositCraftingIngredientInput"
export { StarbaseLevelInfo } from "./StarbaseLevelInfo"
export type {
  StarbaseLevelInfoFields,
  StarbaseLevelInfoJSON,
} from "./StarbaseLevelInfo"
export { StarbaseLevelInfoArrayInput } from "./StarbaseLevelInfoArrayInput"
export type {
  StarbaseLevelInfoArrayInputFields,
  StarbaseLevelInfoArrayInputJSON,
} from "./StarbaseLevelInfoArrayInput"
export { StarbaseLoadingBay } from "./StarbaseLoadingBay"
export type {
  StarbaseLoadingBayFields,
  StarbaseLoadingBayJSON,
} from "./StarbaseLoadingBay"
export { StarbaseRemoveCargoPodInput } from "./StarbaseRemoveCargoPodInput"
export type {
  StarbaseRemoveCargoPodInputFields,
  StarbaseRemoveCargoPodInputJSON,
} from "./StarbaseRemoveCargoPodInput"
export { StarbaseStartCraftingProcessInput } from "./StarbaseStartCraftingProcessInput"
export type {
  StarbaseStartCraftingProcessInputFields,
  StarbaseStartCraftingProcessInputJSON,
} from "./StarbaseStartCraftingProcessInput"
export { StarbaseState }

/** The state of a `Starbase`. */
export type StarbaseStateKind = StarbaseState.Active | StarbaseState.Destroyed
export type StarbaseStateJSON =
  | StarbaseState.ActiveJSON
  | StarbaseState.DestroyedJSON

export { StarbaseTransferCargoInput } from "./StarbaseTransferCargoInput"
export type {
  StarbaseTransferCargoInputFields,
  StarbaseTransferCargoInputJSON,
} from "./StarbaseTransferCargoInput"
export { StarbaseUpgrade } from "./StarbaseUpgrade"
export type {
  StarbaseUpgradeFields,
  StarbaseUpgradeJSON,
} from "./StarbaseUpgrade"
export { StarbaseUpgradeLevelState }

/** The upgrade state for one SB lvl */
export type StarbaseUpgradeLevelStateKind =
  | StarbaseUpgradeLevelState.NotStarted
  | StarbaseUpgradeLevelState.Started
  | StarbaseUpgradeLevelState.Finished
export type StarbaseUpgradeLevelStateJSON =
  | StarbaseUpgradeLevelState.NotStartedJSON
  | StarbaseUpgradeLevelState.StartedJSON
  | StarbaseUpgradeLevelState.FinishedJSON

export { StarbaseUpgradeTask } from "./StarbaseUpgradeTask"
export type {
  StarbaseUpgradeTaskFields,
  StarbaseUpgradeTaskJSON,
} from "./StarbaseUpgradeTask"
export { StarbaseWithdrawCraftingIngredientInput } from "./StarbaseWithdrawCraftingIngredientInput"
export type {
  StarbaseWithdrawCraftingIngredientInputFields,
  StarbaseWithdrawCraftingIngredientInputJSON,
} from "./StarbaseWithdrawCraftingIngredientInput"
export { StartMiningAsteroidInput } from "./StartMiningAsteroidInput"
export type {
  StartMiningAsteroidInputFields,
  StartMiningAsteroidInputJSON,
} from "./StartMiningAsteroidInput"
export { StartSubwarpInput } from "./StartSubwarpInput"
export type {
  StartSubwarpInputFields,
  StartSubwarpInputJSON,
} from "./StartSubwarpInput"
export { StopMiningAsteroidInput } from "./StopMiningAsteroidInput"
export type {
  StopMiningAsteroidInputFields,
  StopMiningAsteroidInputJSON,
} from "./StopMiningAsteroidInput"
export { StopSubwarpInput } from "./StopSubwarpInput"
export type {
  StopSubwarpInputFields,
  StopSubwarpInputJSON,
} from "./StopSubwarpInput"
export { TransferCargoWithinFleetInput } from "./TransferCargoWithinFleetInput"
export type {
  TransferCargoWithinFleetInputFields,
  TransferCargoWithinFleetInputJSON,
} from "./TransferCargoWithinFleetInput"
export { UpdateGameInput } from "./UpdateGameInput"
export type {
  UpdateGameInputFields,
  UpdateGameInputJSON,
} from "./UpdateGameInput"
export { UpdateGameStateInput } from "./UpdateGameStateInput"
export type {
  UpdateGameStateInputFields,
  UpdateGameStateInputJSON,
} from "./UpdateGameStateInput"
export { UpdateMineItemInput } from "./UpdateMineItemInput"
export type {
  UpdateMineItemInputFields,
  UpdateMineItemInputJSON,
} from "./UpdateMineItemInput"
export { UpdatePlanetInput } from "./UpdatePlanetInput"
export type {
  UpdatePlanetInputFields,
  UpdatePlanetInputJSON,
} from "./UpdatePlanetInput"
export { UpdateResourceInput } from "./UpdateResourceInput"
export type {
  UpdateResourceInputFields,
  UpdateResourceInputJSON,
} from "./UpdateResourceInput"
export { UpdateShipEscrowInput } from "./UpdateShipEscrowInput"
export type {
  UpdateShipEscrowInputFields,
  UpdateShipEscrowInputJSON,
} from "./UpdateShipEscrowInput"
export { UpdateShipFleetInput } from "./UpdateShipFleetInput"
export type {
  UpdateShipFleetInputFields,
  UpdateShipFleetInputJSON,
} from "./UpdateShipFleetInput"
export { UpdateShipInput } from "./UpdateShipInput"
export type {
  UpdateShipInputFields,
  UpdateShipInputJSON,
} from "./UpdateShipInput"
export { UpdateStarInput } from "./UpdateStarInput"
export type {
  UpdateStarInputFields,
  UpdateStarInputJSON,
} from "./UpdateStarInput"
export { UpdateStarbaseInput } from "./UpdateStarbaseInput"
export type {
  UpdateStarbaseInputFields,
  UpdateStarbaseInputJSON,
} from "./UpdateStarbaseInput"
export { UpdateSurveyDataUnitTrackerInput } from "./UpdateSurveyDataUnitTrackerInput"
export type {
  UpdateSurveyDataUnitTrackerInputFields,
  UpdateSurveyDataUnitTrackerInputJSON,
} from "./UpdateSurveyDataUnitTrackerInput"
export { Vaults } from "./Vaults"
export type { VaultsFields, VaultsJSON } from "./Vaults"
export { WarpLaneInput } from "./WarpLaneInput"
export type { WarpLaneInputFields, WarpLaneInputJSON } from "./WarpLaneInput"
export { WarpToCoordinateInput } from "./WarpToCoordinateInput"
export type {
  WarpToCoordinateInputFields,
  WarpToCoordinateInputJSON,
} from "./WarpToCoordinateInput"
export { WithdrawCargoFromFleetInput } from "./WithdrawCargoFromFleetInput"
export type {
  WithdrawCargoFromFleetInputFields,
  WithdrawCargoFromFleetInputJSON,
} from "./WithdrawCargoFromFleetInput"
export { WrappedShipEscrow } from "./WrappedShipEscrow"
export type {
  WrappedShipEscrowFields,
  WrappedShipEscrowJSON,
} from "./WrappedShipEscrow"
