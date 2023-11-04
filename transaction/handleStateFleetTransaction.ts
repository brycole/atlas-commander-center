import { FleetStateHandlerAccounts, fleetStateHandler } from "../instructions"
import {PublicKey, TransactionInstruction} from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class HandleStateFleet {
    performTransaction(fleetNumber: number, foodFleetCargoPodTo:string, aMMOFleetCargoPodTo:string, itemMine:string, resource: string, planeta: string
        ,starbase:string, tokenToFood:string, tokenToAmmo:string, bankResource:string, tankFleetHydra:string, tokenMintFood:string, tokenMintAmmo:string, cargoTypeFood:string,
        cargoTypeAmmo:string, cargoTypeLast: string): TransactionInstruction {

        const accounts: FleetStateHandlerAccounts = {
            fleet: new PublicKey(userConfig.myFleets[fleetNumber][0]),
            Account1: new PublicKey(userConfig.owningProfileFaction),
            Account2: new PublicKey(foodFleetCargoPodTo),
            Account3: new PublicKey(aMMOFleetCargoPodTo),
            Account4: new PublicKey(itemMine),
            Account5: new PublicKey(resource),
            Account6: new PublicKey(planeta),
            Account7: new PublicKey(starbase),
            Account8: new PublicKey(tokenToFood),
            Account9: new PublicKey(tokenToAmmo),
            Account10: new PublicKey(bankResource),
            Account11: new PublicKey(tankFleetHydra),
            Account12: new PublicKey(tokenMintFood),
            Account13: new PublicKey(tokenMintAmmo),
            Account14: new PublicKey(cargoTypeFood),
            Account15: new PublicKey(cargoTypeAmmo),
            Account16: new PublicKey(cargoTypeLast), //?
            Account17: userConfig.cargoStardefinition,
            Account18: userConfig.gameId,
            Account19: userConfig.cargoProgram,
            Account20: userConfig.tokenProgram,
        };

        /**console.log("@@@@@@@@@@@@@@@  HandleStateFleet  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts)
        console.log("###########################")*/

        const programId = PROGRAM_ID;
        const transactionInstruction = fleetStateHandler(accounts, programId);
        return transactionInstruction;
    }
}

export default HandleStateFleet;