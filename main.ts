import readline from 'readline';
import * as userActions from './userActions';
import * as user from './userConfig';
import * as ask from "./createQuestion"
import ApiClient from './ApiClient';
import UnDockTransaction from "./transaction/unDockTransaction"
import DockTransaction from "./transaction/dockTransaction"
import WithdrawCargoFromFleet from "./transaction/withdrawCargoFromFleet"
import { exec } from 'child_process';
import CargoToFleetTransaction from "./transaction/cargoToFleetTransaction"
import StartMiningTransaction from "./transaction/startMiningTransaction"
import AssociatedTransaction from "./transaction/associatedAccountTransaction"
import HandleStateFleet from "./transaction/handleStateFleetTransaction"
import StopMining from "./transaction/stopMining"

import Signer, * as signer from "./transaction/signer"

import { extractAmount, getAmountByTokenAddress } from './utils';
import { Connection, PublicKey, Transaction, TransactionInstruction, clusterApiUrl } from '@solana/web3.js';
import { ScreenPrint } from './screenPrint';
import AddShipTransaction from './transaction/addShipTransaction';


console.clear();
console.log("Atlas Commander Center v1.0.0")
console.log("")
console.log("")

const reset = "\x1b[0m"; // Restablecer el color
const red = "\x1b[31m"; // Rojo
const green = "\x1b[32m"; // Verde
const yellow = "\x1b[33m"; // Amarillo
const cyan = "\x1b[36m"; // Cian

const apiUrlAmounts = 'https://api.solscan.io/account/v2/tokens?address=';

let screen = new ScreenPrint()

let selectedAction = -1;
let selectedFleet = -1;

let selectedMine: number[] = [];
let inputFoodFleet: number = -1;
let inputLoops: number = -1;
let resourceMinerWithdraw = 0;

let totalLessFood = 0
let totalLessAmmo = 0
let totalLessFuel = 0

let totalGiveMiner = 0

let stringConsole = "";

async function askUser() {

  //Fleet
  console.log(`${yellow}Flotas disponibles:${reset}`);
  for (let i = 0; i < user.myFleets.length; i++) {
    console.log(i.toString() + " - " + user.myFleets[i][1]);
  }
  const QselectedFleet = await ask.question('Selecciona una flota: ');
  selectedFleet = parseInt(QselectedFleet);
  console.clear()
  stringConsole += `- Seleccionaste la flota: ${green}${user.myFleets[selectedFleet][1]}${reset}\n`
  console.log(stringConsole);

  //Actions
  console.log(`${yellow}Acciones disponibles:${reset}`);
  userActions.actions.forEach((accion, index) => {
    console.log(`${index} - ${accion}`);
  });
  const QselectAction = await ask.question('Selecciona una acción: ')
  selectedAction = parseInt(QselectAction);
  console.clear();
  stringConsole += `- Seleccionaste la acción: ${green}${userActions.actions[selectedAction]}${reset}\n`;
  console.log(stringConsole);
  console.log("")

  //What Mine
  console.log(`${yellow}Minados disponibles:${reset}`);
  userActions.minerAction.forEach((accion, index) => {
    console.log(`${index} - ${accion}`);
  });
  const QwhatMine = await ask.question('Selecciona que minar: ')
  selectedMine[0] = parseInt(QwhatMine);
  console.clear();
  stringConsole += `- Seleccionaste minar: ${green}${userActions.minerAction[selectedMine[0]]}${reset}\n`;
  console.log(stringConsole);
  console.log("")

  //What time
  const QwhatTime = await ask.question('Cuanto tiempo durará el proceso (mins): ')
  selectedMine[1] = parseInt(QwhatTime);
  console.clear();
  stringConsole += `- Tiempo para última acción: ${green}${selectedMine[1]} min${reset}\n`;
  console.log(stringConsole);
  console.log("")

  //Howmany mine
  const QhowManyMine = await ask.question('Cuanta cantidad minará (despue sde restarle el FOOD): ')
  resourceMinerWithdraw = parseInt(QhowManyMine);
  console.clear();
  stringConsole += `- Withdraw minero: ${green}${resourceMinerWithdraw}${reset}\n`;
  console.log(stringConsole);
  console.log("")


  //HowMany FOOD
  const QhowManyFood = await ask.question('Cuanta FOOD deseas añadir cada ciclo: ')
  inputFoodFleet = parseInt(QhowManyFood);
  console.clear();
  stringConsole += `- Añadir ${green}${inputFoodFleet}${reset} de FOOD en cada ciclo.\n`;
  console.log(stringConsole);
  console.log("")

  //loops
  const Qcicles = await ask.question('Cuantas veces deseas repetir la acción (0 = infinito): ')
  inputLoops = parseInt(Qcicles);
  console.clear();
  stringConsole += `- Número de ciclos: ${green}${inputLoops}${reset}\n`;
  screen.setTotalLoop(inputLoops)

  console.log(stringConsole);

  //ask close
  ask.closeText()

  let titleWindows = user.myFleets[selectedFleet][1] + ' -> ' + userActions.actions[selectedAction] + ' -> ' + userActions.minerAction[selectedMine[0]]
  exec(`title ${titleWindows}`)
  screen.setTitle(`${titleWindows}`)
}

async function main() {

  //ask user configurations
  await askUser()

  switch (selectedAction) {
    case 0:
      for (let i = 0; i < inputLoops; i++) {
        screen.setNumLoop(i + 1);
        switch (selectedMine[0]) {
          case 0:
            await startMiningHygrogen();
            break;
          case 1:
            await startMiningCarbon()
            break;
          case 2:
            await startMiningIron()
            break;
          case 3:
            await startMiningBiomass()
            break;
        }
        screen.newLoop();
      }
      break;
    case 1:
      let gg = unDockMRZ16ToBase()
      try {
        let s = new Signer()
        console.log("Go to sign txUnDock")
        await s.signer([gg])
        screen.editarStatus("UnDock", "OK")
        screen.printiScreen()
        await waitSeconds(1 * 60)
      } catch {
        console.log("ERROR Signer txUnDock")
        process.exit(0);
      }
  }



  console.log("FINISHED!")
}

async function startMiningHygrogen() {
  screen.setNameMiner("Hydrogen")
  screen.addActualStatus("Adding Fuel", "")
  screen.addActualStatus("Adding AMMO", "")
  screen.addActualStatus("Adding Food", "")
  screen.addActualStatus("UnDock", "")
  screen.addActualStatus("Start Mining", "")
  screen.addActualStatus("Waiting Mining", "")
  screen.addActualStatus("Stop Mining", "")
  screen.addActualStatus("Dock", "")
  screen.addActualStatus("Withdraw", "")
  screen.printiScreen()

  //1-CheckResources
  await checkResourcesAndADDFleet()


  //2-Undock
  let txUnDock = unDockFleetHydrogen()


  try {
    let s = new Signer()
    console.log("Go to sign txUnDock")
    await s.signer([txUnDock])
    screen.editarStatus("UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txUnDock")
    process.exit(0);
  }

  //3-Start Mining
  let txStartMiningH = startMiningH()
  try {
    let s = new Signer()
    console.log("Go to sign txStartMiningH")
    await s.signer([txStartMiningH])
    screen.editarStatus("Start Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningH")
    process.exit(0);
  }

  
  //WAITING MINING

  let totalwaiting = selectedMine[1] + 1
  screen.editarStatus("Waiting Mining", totalwaiting + " min")
  screen.printiScreen()
  await waitSeconds((totalwaiting) * 60)

  //4-Stop Mining
  let createTxAssociation = createStopAssociation()
  let handkestate = callHandleState()
  let stopH = stopMiningH()

  try {
    let s = new Signer()
    console.log("Go to sign createTxAssociation handkestate stopH")
    await s.signer([createTxAssociation, handkestate, stopH])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Stop Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningH")
    process.exit(0);
  }

  //5-DOCK
  let dockTx = dock()

  try {
    let s = new Signer()
    console.log("Go to sign dockTx")
    await s.signer([dockTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txdock")
    process.exit(0);
  }

  //6-Withdraw
  let associated = createAssociationWithdrawHydro()
  //let amountHydrogen = user.fleetCapacity[selectedFleet] - inputFoodFleet
  let amountHydrogen = resourceMinerWithdraw
  if (amountHydrogen > 0) {
    process.stdout.write(`${yellow}Withdraw Hydrogen of ${green}` + user.myFleets[selectedFleet][1] + `${yellow} in base .................${reset}`)
    screen.editarStatus("Withdraw", "*")
    screen.printiScreen()
    let withdrawHydrogenTx = await withdrawHydrogenFleet(amountHydrogen)

    try {
      let s = new Signer()
      await s.signer([associated, withdrawHydrogenTx])
      console.log(`${green}OK${reset}`)
      totalGiveMiner = totalGiveMiner + amountHydrogen;
      screen.setTotalGiveMiner(totalGiveMiner)
      screen.editarStatus("Withdraw", "OK +" + amountHydrogen)
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch {
      console.log("ERROR Signer withdraw Hydrogen: " + amountHydrogen)
      process.exit(0);
    }
  }
  await waitSeconds(1 * 20)
}

async function startMiningCarbon() {

  screen.setNameMiner("Carbon")
  screen.addActualStatus("Adding Fuel", "")
  screen.addActualStatus("Adding AMMO", "")
  screen.addActualStatus("Adding Food", "")
  screen.addActualStatus("UnDock", "")
  screen.addActualStatus("Start Mining", "")
  screen.addActualStatus("Waiting Mining", "")
  screen.addActualStatus("Stop Mining", "")
  screen.addActualStatus("Remote Dock", "")
  screen.addActualStatus("Local UnDock", "")
  screen.addActualStatus("Dock", "")
  screen.addActualStatus("Withdraw", "")
  screen.printiScreen()

  //1-CheckResources
  await checkResourcesAndADDFleet()

  //2-Undock
  let txUnDockFromBase = unDockFleetCarbonFromBase()

  try {
    let s = new Signer()
    console.log("Go to sign txUnDock")
    await s.signer([txUnDockFromBase])
    screen.editarStatus("UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txUnDock")
    process.exit(0);
  }

  //3-Start Mining
  let txStartMiningC = startMiningCa()
  try {
    let s = new Signer()
    console.log("Go to sign txStartMiningC")
    await s.signer([txStartMiningC])
    screen.editarStatus("Start Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningC")
    process.exit(0);
  }


  //WAITING MINING
  let totalwaiting = selectedMine[1] + 1
  screen.editarStatus("Waiting Mining", totalwaiting + " min")
  screen.printiScreen()
  await waitSeconds((totalwaiting) * 60)

  //4-Stop Mining
  let createTxAssociation = createStopAssociationCa()
  let handkestate = callHandleStateCa()
  let stopH = stopMiningCa()

  try {
    let s = new Signer()
    console.log("Go to sign createTxAssociation handkestate stopH")
    await s.signer([createTxAssociation, handkestate, stopH])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Stop Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningH")
    process.exit(0);
  }

  //5-DOCK
  let dockCarbonTx = dockCarbon()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([dockCarbonTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Remote Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txdock")
    process.exit(0);
  }

  //UnDock to base
  let undockToBaseTx = unDockCarbonToBase()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([undockToBaseTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Local UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockCarbonTx")
    process.exit(0);
  }

  //dock in base
  let dockInBase = dock()

  try {
    let s = new Signer()
    console.log("Go to sign dockInBase")
    await s.signer([dockInBase])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockInBase")
    process.exit(0);
  }

  //6-Withdraw
  let associated = createAssociationWithdrawCa()
  //let amountHydrogen = user.fleetCapacity[selectedFleet] - inputFoodFleet
  let amountCa = resourceMinerWithdraw
  if (amountCa > 0) {
    process.stdout.write(`${yellow}Withdraw Carbon of ${green}` + user.myFleets[selectedFleet][1] + `${yellow} in base .................${reset}`)
    screen.editarStatus("Withdraw", "*")
    screen.printiScreen()
    let withdrawCarbonTx = await withdrawCarbonFleet(amountCa)

    try {
      let s = new Signer()
      await s.signer([associated, withdrawCarbonTx])
      console.log(`${green}OK${reset}`)
      totalGiveMiner = totalGiveMiner + amountCa;
      screen.setTotalGiveMiner(totalGiveMiner)
      screen.editarStatus("Withdraw", "OK +" + amountCa)
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch {
      console.log("ERROR Signer withdraw Hydrogen: " + amountCa)
      process.exit(0);
    }
  }
  await waitSeconds(1 * 60)
}

async function startMiningIron() {

  screen.setNameMiner("Iron x2")
  screen.addActualStatus("Adding Fuel", "")
  screen.addActualStatus("Adding AMMO", "")
  screen.addActualStatus("Adding Food", "")
  screen.addActualStatus("UnDock", "")
  screen.addActualStatus("Start Mining", "")
  screen.addActualStatus("Waiting Mining", "")
  screen.addActualStatus("Stop Mining", "")
  screen.addActualStatus("Remote Dock", "")
  screen.addActualStatus("Local UnDock", "")
  screen.addActualStatus("Dock", "")
  screen.addActualStatus("Withdraw", "")
  screen.printiScreen()

  //1-CheckResources
  await checkResourcesAndADDFleet()

  //2-Undock
  let txUnDockFromBase = unDockIronx2FromBase()

  try {
    let s = new Signer()
    console.log("Go to sign txUnDock")
    await s.signer([txUnDockFromBase])
    screen.editarStatus("UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txUnDock")
    process.exit(0);
  }

  //3-Start Mining
  let txStartMiningF = startMiningFerro()
  try {
    let s = new Signer()
    console.log("Go to sign txStartMiningC")
    await s.signer([txStartMiningF])
    screen.editarStatus("Start Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningC")
    process.exit(0);
  }


  //WAITING MINING
  let totalwaiting = selectedMine[1] + 1
  screen.editarStatus("Waiting Mining", totalwaiting + " min")
  screen.printiScreen()
  await waitSeconds((totalwaiting) * 60)

  //4-Stop Mining
  let createTxAssociation = createStopAssociationFerro()
  let handkestate = callHandleStateFerro()
  let stopF = stopMiningFerro()

  try {
    let s = new Signer()
    console.log("Go to sign createTxAssociation handkestate stopH")
    await s.signer([createTxAssociation, handkestate, stopF])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Stop Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningH")
    process.exit(0);
  }

  //5-DOCK
  let dockIronTx = dockIronx2()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([dockIronTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Remote Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txdock")
    process.exit(0);
  }

  //UnDock to base
  let undockToBaseTx = unDockIronx2ToBase()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([undockToBaseTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Local UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockCarbonTx")
    process.exit(0);
  }

  //dock in base
  let dockInBase = dock()

  try {
    let s = new Signer()
    console.log("Go to sign dockInBase")
    await s.signer([dockInBase])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockInBase")
    process.exit(0);
  }

  //6-Withdraw
  let associated = createAssociationWithdrawFerro()
  //let amountHydrogen = user.fleetCapacity[selectedFleet] - inputFoodFleet
  let amountCa = resourceMinerWithdraw
  if (amountCa > 0) {
    process.stdout.write(`${yellow}Withdraw Carbon of ${green}` + user.myFleets[selectedFleet][1] + `${yellow} in base .................${reset}`)
    screen.editarStatus("Withdraw", "*")
    screen.printiScreen()
    let withdrawIronTx = await withdrawFerroFleet(amountCa)

    try {
      let s = new Signer()
      await s.signer([associated, withdrawIronTx])
      console.log(`${green}OK${reset}`)
      totalGiveMiner = totalGiveMiner + amountCa;
      screen.setTotalGiveMiner(totalGiveMiner)
      screen.editarStatus("Withdraw", "OK +" + amountCa)
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch {
      console.log("ERROR Signer withdraw Hydrogen: " + amountCa)
      process.exit(0);
    }
  }
  await waitSeconds(1 * 60)
}

async function startMiningCooper() {

  screen.setNameMiner("Cooper")
  screen.addActualStatus("Adding Fuel", "")
  screen.addActualStatus("Adding AMMO", "")
  screen.addActualStatus("Adding Food", "")
  screen.addActualStatus("UnDock", "")
  screen.addActualStatus("Start Mining", "")
  screen.addActualStatus("Waiting Mining", "")
  screen.addActualStatus("Stop Mining", "")
  screen.addActualStatus("Remote Dock", "")
  screen.addActualStatus("Local UnDock", "")
  screen.addActualStatus("Dock", "")
  screen.addActualStatus("Withdraw", "")
  screen.printiScreen()

  //1-CheckResources
  await checkResourcesAndADDFleet()

  //2-Undock
  let txUnDockFromBase = unDockFleetCarbonFromBase()

  try {
    let s = new Signer()
    console.log("Go to sign txUnDock")
    await s.signer([txUnDockFromBase])
    screen.editarStatus("UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txUnDock")
    process.exit(0);
  }

  //3-Start Mining
  let txStartMiningC = startMiningCa()
  try {
    let s = new Signer()
    console.log("Go to sign txStartMiningC")
    await s.signer([txStartMiningC])
    screen.editarStatus("Start Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningC")
    process.exit(0);
  }


  //WAITING MINING
  let totalwaiting = selectedMine[1] + 1
  screen.editarStatus("Waiting Mining", totalwaiting + " min")
  screen.printiScreen()
  await waitSeconds((totalwaiting) * 60)

  //4-Stop Mining
  let createTxAssociation = createStopAssociationCa()
  let handkestate = callHandleStateCa()
  let stopH = stopMiningCa()

  try {
    let s = new Signer()
    console.log("Go to sign createTxAssociation handkestate stopH")
    await s.signer([createTxAssociation, handkestate, stopH])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Stop Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer createTxAssociation")
    process.exit(0);
  }

  //5-DOCK
  let dockCarbonTx = dockCarbon()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([dockCarbonTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Remote Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txdock")
    process.exit(0);
  }

  //UnDock to base
  let undockToBaseTx = unDockCarbonToBase()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([undockToBaseTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Local UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockCarbonTx")
    process.exit(0);
  }

  //dock in base
  let dockInBase = dock()

  try {
    let s = new Signer()
    console.log("Go to sign dockInBase")
    await s.signer([dockInBase])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockInBase")
    process.exit(0);
  }

  //6-Withdraw
  let associated = createAssociationWithdrawCa()
  //let amountHydrogen = user.fleetCapacity[selectedFleet] - inputFoodFleet
  let amountCa = resourceMinerWithdraw
  if (amountCa > 0) {
    process.stdout.write(`${yellow}Withdraw Carbon of ${green}` + user.myFleets[selectedFleet][1] + `${yellow} in base .................${reset}`)
    screen.editarStatus("Withdraw", "*")
    screen.printiScreen()
    let withdrawCarbonTx = await withdrawCarbonFleet(amountCa)

    try {
      let s = new Signer()
      await s.signer([associated, withdrawCarbonTx])
      console.log(`${green}OK${reset}`)
      totalGiveMiner = totalGiveMiner + amountCa;
      screen.setTotalGiveMiner(totalGiveMiner)
      screen.editarStatus("Withdraw", "OK +" + amountCa)
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch {
      console.log("ERROR Signer withdraw Hydrogen: " + amountCa)
      process.exit(0);
    }
  }
  await waitSeconds(1 * 60)
}

async function startMiningBiomass() {

  screen.setNameMiner("Biomass")
  screen.addActualStatus("Adding Fuel", "")
  screen.addActualStatus("Adding AMMO", "")
  screen.addActualStatus("Adding Food", "")
  screen.addActualStatus("UnDock", "")
  screen.addActualStatus("Start Mining", "")
  screen.addActualStatus("Waiting Mining", "")
  screen.addActualStatus("Stop Mining", "")
  screen.addActualStatus("Remote Dock", "")
  screen.addActualStatus("Local UnDock", "")
  screen.addActualStatus("Dock", "")
  screen.addActualStatus("Withdraw", "")
  screen.printiScreen()

  //1-CheckResources
  await checkResourcesAndADDFleet()

  //2-Undock
  let txUnDockFromBase = unDockFleetBiomassFromBase()

  try {
    let s = new Signer()
    console.log("Go to sign txUnDock")
    await s.signer([txUnDockFromBase])
    screen.editarStatus("UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txUnDock")
    process.exit(0);
  }

  //3-Start Mining
  let txStartMiningB = startMiningBio()
  try {
    let s = new Signer()
    console.log("Go to sign txStartMiningC")
    await s.signer([txStartMiningB])
    screen.editarStatus("Start Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningC")
    process.exit(0);
  }


  //WAITING MINING
  let totalwaiting = selectedMine[1] + 1
  screen.editarStatus("Waiting Mining", totalwaiting + " min")
  screen.printiScreen()
  await waitSeconds((totalwaiting) * 60)

  //4-Stop Mining
  let createTxAssociation = createStopAssociationBio()
  let handkestate = callHandleStateBio()
  let stopB = stopMiningBio()

  try {
    let s = new Signer()
    console.log("Go to sign createTxAssociation handkestate stopB")
    await s.signer([createTxAssociation, handkestate, stopB])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Stop Mining", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txStartMiningH")
    process.exit(0);
  }

  //5-DOCK
  let dockIronTx = dockFleetBiomass()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([dockIronTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Remote Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer txdock")
    process.exit(0);
  }

  //UnDock to base
  let undockToBaseTx = unDockFleetBiomassToBase()

  try {
    let s = new Signer()
    console.log("Go to sign dockCarbonTx")
    await s.signer([undockToBaseTx])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Local UnDock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockCarbonTx")
    process.exit(0);
  }

  //dock in base
  let dockInBase = dock()

  try {
    let s = new Signer()
    console.log("Go to sign dockInBase")
    await s.signer([dockInBase])
    console.log(`${green}OK${reset}`)
    screen.editarStatus("Dock", "OK")
    screen.printiScreen()
    await waitSeconds(1 * 60)
  } catch {
    console.log("ERROR Signer dockInBase")
    process.exit(0);
  }

  //6-Withdraw
  let associated = createAssociationWithdrawBio()
  //let amountHydrogen = user.fleetCapacity[selectedFleet] - inputFoodFleet
  let amountBio = resourceMinerWithdraw
  if (amountBio > 0) {
    process.stdout.write(`${yellow}Withdraw Biomass of ${green}` + user.myFleets[selectedFleet][1] + `${yellow} in base .................${reset}`)
    screen.editarStatus("Withdraw", "*")
    screen.printiScreen()
    let withdrawIronTx = await withdrawFerroBiomass(amountBio)

    try {
      let s = new Signer()
      await s.signer([associated, withdrawIronTx])
      console.log(`${green}OK${reset}`)
      totalGiveMiner = totalGiveMiner + amountBio;
      screen.setTotalGiveMiner(totalGiveMiner)
      screen.editarStatus("Withdraw", "OK +" + amountBio)
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch {
      console.log("ERROR Signer withdraw Hydrogen: " + amountBio)
      process.exit(0);
    }
  }
  await waitSeconds(1 * 60)
}
/**
 * Simple actions
 */

/**
 * 
 * 
 * 
 * 
 * stopMiningH
 */
function createAssociation() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tankFleetHydra[selectedFleet],
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenMint[3]
  )
}

function createAssociationWithdrawFood() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tokenFromBaseFood[0],
    user.cargoPod,
    user.tokenMint[0]
  )
}

function createAssociationWithdrawHydro() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tokenFromBaseHydrogen[0],
    user.cargoPod,
    user.tokenMint[3]
  )
}

function createAssociationWithdrawCa() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tokenFromBaseCarbon[0],
    user.cargoPod,
    user.tokenMint[4]
  )
}

function createAssociationWithdrawFerro() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tokenFromBaseIronx2[0],
    user.cargoPod,
    user.tokenMint[5]
  )
}

function createAssociationWithdrawBio() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tokenFromBaseBiomass[0],
    user.cargoPod,
    user.tokenMint[6]
  )
}

function createStopAssociation() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tankFleetHydra[selectedFleet],
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenMint[3]
  )
}

function createStopAssociationCa() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tankFleetCarbon[selectedFleet],
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenMint[4]
  )
}

function createStopAssociationFerro() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tankFleetIron[selectedFleet],
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenMint[5]
  )
}


function createStopAssociationBio() {
  let assoc = new AssociatedTransaction()
  return assoc.performTransaction(
    user.tankFleetBio[selectedFleet],
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenMint[6]
  )
}

function addsShips() {
  let assoc = new AddShipTransaction()
  return assoc.performTransaction(
    selectedFleet,
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1]
  )
}

function callHandleState() {
  let handle = new HandleStateFleet()
  return handle.performTransaction(
    selectedFleet,
    user.foodFleetCargoPodTo[selectedFleet],
    user.AMMOFleetCargoPodTo[selectedFleet],
    user.itemMine[0],
    user.resource[0],
    user.planetas[3],
    user.starBaseAndStarBasePlayer[1][0],
    user.tokenTankFleetFood[selectedFleet],
    user.tokenTankFleetAmmo[selectedFleet],
    user.bankResource[0],
    user.tankFleetHydra[selectedFleet],
    user.tokenMint[0],
    user.tokenMint[2],
    user.cargoType[2],
    user.cargoType[0],
    user.cargoType[3]
  )
}

function callHandleStateCa() {
  let handle = new HandleStateFleet()
  return handle.performTransaction(
    selectedFleet,
    user.foodFleetCargoPodTo[selectedFleet],
    user.AMMOFleetCargoPodTo[selectedFleet],
    user.itemMine[1],
    user.resource[1],
    user.planetas[2],
    user.starBaseAndStarBasePlayer[4][0],
    user.tokenTankFleetFood[selectedFleet],
    user.tokenTankFleetAmmo[selectedFleet],
    user.bankResource[1],
    user.tankFleetCarbon[selectedFleet],
    user.tokenMint[0],
    user.tokenMint[2],
    user.cargoType[2],
    user.cargoType[0],
    user.cargoType[4]
  )
}

function callHandleStateFerro() {
  let handle = new HandleStateFleet()
  return handle.performTransaction(
    selectedFleet,
    user.foodFleetCargoPodTo[selectedFleet],
    user.AMMOFleetCargoPodTo[selectedFleet],
    user.itemMine[2],
    user.resource[2],
    user.planetas[4],
    user.starBaseAndStarBasePlayer[5][0],
    user.tokenTankFleetFood[selectedFleet],
    user.tokenTankFleetAmmo[selectedFleet],
    user.bankResource[2],
    user.tankFleetIron[selectedFleet],
    user.tokenMint[0],
    user.tokenMint[2],
    user.cargoType[2],
    user.cargoType[0],
    user.cargoType[5]
  )
}

function callHandleStateBio() {
  let handle = new HandleStateFleet()
  return handle.performTransaction(
    selectedFleet,
    user.foodFleetCargoPodTo[selectedFleet],
    user.AMMOFleetCargoPodTo[selectedFleet],
    user.itemMine[3],
    user.resource[3],
    user.planetas[5],
    user.starBaseAndStarBasePlayer[3][0],
    user.tokenTankFleetFood[selectedFleet],
    user.tokenTankFleetAmmo[selectedFleet],
    user.bankResource[3],
    user.tankFleetBio[selectedFleet],
    user.tokenMint[0],
    user.tokenMint[2],
    user.cargoType[2],
    user.cargoType[0],
    user.cargoType[6]
  )
}

function dock() {
  process.stdout.write(`${yellow}Dock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Dock", "*")
  screen.printiScreen()
  let dock = new DockTransaction()
  return dock.performTransaction(
    selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1]
  )
}

function stopMiningH() {
  process.stdout.write(`${yellow}Parando de minar Hydrogen ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Stop Mining", "*")
  screen.printiScreen()
  let stopH = new StopMining()
  return stopH.performTransaction(
    selectedFleet,
    user.fuelFleetCargoPodTo[selectedFleet],
    user.resource[0],
    user.planetas[3],
    user.cargoType[1],
    user.tokenTankFleetFuel[selectedFleet],
    user.tokenMint[1]
  )
}

function stopMiningCa() {
  process.stdout.write(`${yellow}Parando de minar Carbon ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Stop Mining", "*")
  screen.printiScreen()
  let stopH = new StopMining()
  return stopH.performTransaction(
    selectedFleet,
    user.fuelFleetCargoPodTo[selectedFleet],
    user.resource[1],
    user.planetas[2],
    user.cargoType[1],
    user.tokenTankFleetFuel[selectedFleet],
    user.tokenMint[1]
  )
}

function stopMiningFerro() {
  process.stdout.write(`${yellow}Parando de minar Iron ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Stop Mining", "*")
  screen.printiScreen()
  let stopH = new StopMining()
  return stopH.performTransaction(
    selectedFleet,
    user.fuelFleetCargoPodTo[selectedFleet],
    user.resource[2],
    user.planetas[4],
    user.cargoType[1],
    user.tokenTankFleetFuel[selectedFleet],
    user.tokenMint[1]
  )
}

function stopMiningBio() {
  process.stdout.write(`${yellow}Parando de minar Biomass ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Stop Mining", "*")
  screen.printiScreen()
  let stopH = new StopMining()
  return stopH.performTransaction(
    selectedFleet,
    user.fuelFleetCargoPodTo[selectedFleet],
    user.resource[3],
    user.planetas[5],
    user.cargoType[1],
    user.tokenTankFleetFuel[selectedFleet],
    user.tokenMint[1]
  )
}

/**
 * 
 * 
 * 
 * WithdrawFleet
 */

async function withdrawHydrogenFleet(amount: number) {
  let withdrawH = new WithdrawCargoFromFleet()
  return withdrawH.performTransaction(
    selectedFleet,
    amount,
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenFromBaseHydrogen[0],
    user.cargoType[3],
    user.tankFleetHydra[selectedFleet],
    user.tokenMint[3],
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1],
    user.starBaseAndStarBasePlayer[1][0]
  )
}

async function withdrawCarbonFleet(amount: number) {
  let withdrawH = new WithdrawCargoFromFleet()
  return withdrawH.performTransaction(
    selectedFleet,
    amount,
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenFromBaseCarbon[0],
    user.cargoType[4],
    user.tankFleetCarbon[selectedFleet],
    user.tokenMint[4],
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1],
    user.starBaseAndStarBasePlayer[1][0]
  )
}

async function withdrawFerroFleet(amount: number) {
  let withdrawH = new WithdrawCargoFromFleet()
  return withdrawH.performTransaction(
    selectedFleet,
    amount,
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenFromBaseIronx2[0],
    user.cargoType[5],
    user.tankFleetIron[selectedFleet],
    user.tokenMint[5],
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1],
    user.starBaseAndStarBasePlayer[1][0]
  )
}

async function withdrawFerroBiomass(amount: number) {
  let withdrawH = new WithdrawCargoFromFleet()
  return withdrawH.performTransaction(
    selectedFleet,
    amount,
    user.foodFleetCargoPodTo[selectedFleet],
    user.tokenFromBaseBiomass[0],
    user.cargoType[6],
    user.tankFleetBio[selectedFleet],
    user.tokenMint[6],
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1],
    user.starBaseAndStarBasePlayer[1][0]
  )
}
/**
 * 
 * 
 * 
 * startMiningH
 */
function startMiningH(): TransactionInstruction {
  process.stdout.write(`${yellow}Empezando a minar Hydrogen ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Start Mining", "*")
  screen.printiScreen()
  let startM = new StartMiningTransaction()
  return startM.performTransaction(
    selectedFleet,
    user.itemMine[0],
    user.resource[0],
    user.planetas[3],
    user.starBaseAndStarBasePlayer[1][0],
    user.starBaseAndStarBasePlayer[1][1])
}

function startMiningCa(): TransactionInstruction {
  process.stdout.write(`${yellow}Empezando a minar Carbon ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Start Mining", "*")
  screen.printiScreen()
  let startM = new StartMiningTransaction()
  return startM.performTransaction(
    selectedFleet,
    user.itemMine[1],
    user.resource[1],
    user.planetas[2],
    user.starBaseAndStarBasePlayer[4][0],
    user.starBaseAndStarBasePlayer[4][1])
}


function startMiningFerro(): TransactionInstruction {
  process.stdout.write(`${yellow}Empezando a minar Iron ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Start Mining", "*")
  screen.printiScreen()
  let startM = new StartMiningTransaction()
  return startM.performTransaction(
    selectedFleet,
    user.itemMine[2],
    user.resource[2],
    user.planetas[4],
    user.starBaseAndStarBasePlayer[5][0],
    user.starBaseAndStarBasePlayer[5][1])
}

function startMiningBio(): TransactionInstruction {
  process.stdout.write(`${yellow}Empezando a minar Bio ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Start Mining", "*")
  screen.printiScreen()
  let startM = new StartMiningTransaction()
  return startM.performTransaction(
    selectedFleet,
    user.itemMine[3],
    user.resource[3],
    user.planetas[5],
    user.starBaseAndStarBasePlayer[3][0],
    user.starBaseAndStarBasePlayer[3][1])
}


/**
 * 
 * 
 * 
 * checkResourcesAndADDFleet
 */
async function checkResourcesAndADDFleet() {
  console.log(`${yellow}Analizando Almacen de ${green}` + user.myFleets[selectedFleet][1] + `${reset}`)

  let actualFuel = 0
  let actualAmmo = 0
  let actualFood = 0

  //actual fuel
  let apiClient1 = new ApiClient(apiUrlAmounts + user.fuelFleetCargoPodTo[selectedFleet]);
  await apiClient1.fetchData()
    .then(data => {
      actualFuel = extractAmount(data)
    })
    .catch(error => {
      console.error('Error 1:', error);
    });

  await waitSeconds(3)
  //actual ammo
  let apiClient2 = new ApiClient(apiUrlAmounts + user.AMMOFleetCargoPodTo[selectedFleet]);
  await apiClient2.fetchData()
    .then(data => {
      actualAmmo = extractAmount(data)
    })
    .catch(error => {
      console.error('Error 1:', error);
    });

  await waitSeconds(3)
  //actual food
  let apiClient3 = new ApiClient(apiUrlAmounts + user.foodFleetCargoPodTo[selectedFleet]);
  await apiClient3.fetchData()
    .then(data => {
      actualFood = extractAmount(data,)
    })
    .catch(error => {
      console.error('Error 1:', error);
    });

  let addingFuel = user.fleetCapacityFuel[selectedFleet] - actualFuel
  let addingAmmo = user.fleetCapacityAmmo[selectedFleet] - actualAmmo
  let addingFood = inputFoodFleet

  console.log(`Actual fuel: ${yellow}` + actualFuel + `${reset}`)
  console.log(`Actual ammo: ${yellow}` + actualAmmo + `${reset}`)
  console.log(`Actual food: ${yellow}` + actualFood + `${reset}`)
  console.log("")

  //ADD FUEL
  if (addingFuel > 1) {
    process.stdout.write(`${cyan}Añadiendo ` + addingFuel + ` de FUEL ${reset}.................`)
    screen.editarStatus("Adding Fuel", "*")
    screen.printiScreen()
    let assoFuel = new AssociatedTransaction()
    let assoFuelTx = assoFuel.performTransaction(
      user.tokenTankFleetFuel[selectedFleet],
      user.fuelFleetCargoPodTo[selectedFleet],
      user.tokenMint[1]
    )

    let cargo = new CargoToFleetTransaction()
    let txCargoFuel = cargo.performTransaction(
      selectedFleet,
      addingFuel,
      user.fuelFleetCargoPodTo[selectedFleet],
      user.tokenTankFleetFuel[selectedFleet],
      user.cargoType[1],
      user.tokenFromBaseFuel[0],
      user.tokenMint[1])

    try {
      let s = new Signer()
      console.log("Go to sign assoFuelTx, txCargoFuel")
      await s.signer([assoFuelTx, txCargoFuel])
      console.log(`${green}OK${reset}`)
      screen.editarStatus("Adding Fuel", "OK")
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch (error) {
      console.log("ERROR Signer txCargoFuel")
      console.error(error)
      process.exit(0);
    }

    totalLessFuel = totalLessFuel - addingFuel
    screen.setTotalLessFuel(totalLessFuel)
  }

  if (addingAmmo > 1) {
    //ADD AMMO
    process.stdout.write(`${cyan}Añadiendo ` + addingAmmo + ` de AMMO ${reset}.................`)
    screen.editarStatus("Adding AMMO", "*")
    screen.printiScreen()
    let assoAMMO = new AssociatedTransaction()
    let assoAMMOTx = assoAMMO.performTransaction(
      user.tokenTankFleetAmmo[selectedFleet],
      user.AMMOFleetCargoPodTo[selectedFleet],
      user.tokenMint[2]
    )


    let cargo = new CargoToFleetTransaction()
    let txCargoAmmo = cargo.performTransaction(
      selectedFleet,
      addingAmmo,
      user.AMMOFleetCargoPodTo[selectedFleet],
      user.tokenTankFleetAmmo[selectedFleet],
      user.cargoType[0],
      user.tokenFromBaseAmmo[0],
      user.tokenMint[2])

    try {
      let s = new Signer()
      console.log("Go to sign assoAMMOTx, txCargoAmmo")
      await s.signer([assoAMMOTx, txCargoAmmo])
      console.log(`${green}OK${reset}`)
      screen.editarStatus("Adding AMMO", "OK")
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch (error) {
      console.log("ERROR Signer txCargoAmmo")
      console.error(error)
      process.exit(0);
    }

    totalLessAmmo = totalLessAmmo - addingAmmo
    screen.setTotalLessAmmo(totalLessAmmo)
  }

  if (addingFood > 1) {
    //ADD FOOD
    process.stdout.write(`${cyan}Añadiendo ` + addingFood + ` de FOOD ${reset}.................`)
    screen.editarStatus("Adding Food", "*")
    screen.printiScreen()
    let assoFood = new AssociatedTransaction()
    let assoFoodTx = assoFood.performTransaction(
      user.tokenTankFleetFood[selectedFleet],
      user.foodFleetCargoPodTo[selectedFleet],
      user.tokenMint[0]
    )

    let cargo = new CargoToFleetTransaction()
    let txCargoFood = cargo.performTransaction(
      selectedFleet,
      addingFood,
      user.foodFleetCargoPodTo[selectedFleet],
      user.tokenTankFleetFood[selectedFleet],
      user.cargoType[2],
      user.tokenFromBaseFood[0],
      user.tokenMint[0])

    try {
      let s = new Signer()
      console.log("Go to sign assoFoodTx, txCargoFood")
      await s.signer([assoFoodTx, txCargoFood])
      console.log(`${green}OK${reset}`)
      screen.editarStatus("Adding Food", "OK")
      screen.printiScreen()
      await waitSeconds(1 * 60)
    } catch (error) {
      console.log("ERROR Signer txCargoFood")
      console.error(error)
      process.exit(0);
    }

    totalLessFood = totalLessFood - addingFood
    screen.setTotalLessFood(totalLessFood)
  }
}



/**
 * 
 * 
 * 
 * unDockFleet
 */
function unDockFleetHydrogen(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[1][0])
}

function unDockFleetCarbonFromBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[4][0], user.starBaseAndStarBasePlayer[4][1], user.starBaseAndStarBasePlayer[1][0])
}

function unDockFleetBiomassFromBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[3][0], user.starBaseAndStarBasePlayer[3][1], user.starBaseAndStarBasePlayer[1][0])
}

function dockFleetBiomass(): TransactionInstruction {
  process.stdout.write(`${yellow}Dock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Remote Dock", "*")
  screen.printiScreen()
  let unDock = new DockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[3][0], user.starBaseAndStarBasePlayer[3][1])
}

function unDockFleetBiomassToBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[3][0])
}

function unDockCarbonToBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[4][0])
}

function unDockIronx2ToBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[5][0])
}

function unDockMRZ16ToBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[5][0])
}

function unDockIronx2FromBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[5][0], user.starBaseAndStarBasePlayer[5][1], user.starBaseAndStarBasePlayer[1][0])
}


function dockIronx2(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Dock", "*")
  screen.printiScreen()
  let unDock = new DockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[5][0], user.starBaseAndStarBasePlayer[5][1])
}

function dockCarbon(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("Dock", "*")
  screen.printiScreen()
  let unDock = new DockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[4][0], user.starBaseAndStarBasePlayer[4][1])
}

function unDockFromIronToBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[1][0], user.starBaseAndStarBasePlayer[1][1], user.starBaseAndStarBasePlayer[0][0])
}

function unDockFleetCooperFromBase(): TransactionInstruction {
  process.stdout.write(`${yellow}UnDock ${green}` + user.myFleets[selectedFleet][1] + `${reset}.................`)
  screen.editarStatus("UnDock", "*")
  screen.printiScreen()
  let unDock = new UnDockTransaction()
  return unDock.performTransaction(selectedFleet, user.starBaseAndStarBasePlayer[2][0], user.starBaseAndStarBasePlayer[2][2], user.starBaseAndStarBasePlayer[1][0])
}

async function waitSeconds(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time * 1000); // 5000 milisegundos (5 segundos)
  });
}

main();

