import { StopMiningAsteroidArgs, StopMiningAsteroidAccounts, stopMiningAsteroid } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"


class StopMining {
    performTransaction(fleetNum: number, fuelTank: string, resource:string, planet:string, cargoType:string, tokenFrom: string, tokenMint:string): TransactionInstruction {
        const args: StopMiningAsteroidArgs = {
            input: { keyIndex: 0 },
        };

        const accounts: StopMiningAsteroidAccounts = {
            gameAccountsFleetAndOwner: {
                gameFleetAndOwner: {
                    fleetAndOwner: {
                        key: userConfig.publicKey,
                        owningProfile: userConfig.owningProfile,
                        owningProfileFaction: userConfig.owningProfileFaction,
                        fleet: new PublicKey(userConfig.myFleets[fleetNum][0]),
                    },
                    gameId: userConfig.gameId,
                },
                gameState: userConfig.gameState,
            },
            resource: new PublicKey(resource),
            planet: new PublicKey(planet),
            fuelTank: new PublicKey(fuelTank),
            cargoType: new PublicKey(cargoType),
            cargoStatsDefinition: userConfig.cargoStardefinition,
            tokenFrom: new PublicKey(tokenFrom),
            tokenMint: new PublicKey(tokenMint),
            cargoProgram: userConfig.cargoProgram,
            tokenProgram: userConfig.tokenProgram,
        };
        /**console.log("@@@@@@@@@@@@@@@  StopMining  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner)
        console.log(accounts)
        console.log("###########################")*/
        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = stopMiningAsteroid(args, accounts, programId);

        return transactionInstruction;
    }
}

export default StopMining;