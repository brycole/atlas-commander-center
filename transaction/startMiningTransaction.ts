import { StartMiningAsteroidArgs, StartMiningAsteroidAccounts, startMiningAsteroid } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class StartMiningTransaction {
    performTransaction(fleetNumber: number, mineItem: string, resource: string, planet: string, starbase: string, starbaseplayer: string): TransactionInstruction {
        const args: StartMiningAsteroidArgs = {
            input: { keyIndex: 0 },
        };

        const accounts: StartMiningAsteroidAccounts = {
            gameAccountsFleetAndOwner: {
                gameFleetAndOwner: {
                    fleetAndOwner: {
                        key: userConfig.publicKey,
                        owningProfile: userConfig.owningProfile,
                        owningProfileFaction: userConfig.owningProfileFaction,
                        fleet: new PublicKey(userConfig.myFleets[fleetNumber][0]),
                    },
                    gameId: userConfig.gameId,
                },
                gameState: userConfig.gameState,
            },
            starbaseAndStarbasePlayer: {
                starbase: new PublicKey(starbase),
                starbasePlayer: new PublicKey(starbaseplayer),
            },
            mineItem: new PublicKey(mineItem),
            resource: new PublicKey(resource),
            planet: new PublicKey(planet),
        };
        /**console.log("@@@@@@@@@@@@@@@  StartMiningTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner)
        console.log(accounts)
        console.log("###########################")*/
        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = startMiningAsteroid(args, accounts, programId);
        return transactionInstruction;
    }
}

export default StartMiningTransaction;