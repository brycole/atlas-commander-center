import { loadingBayToIdle, LoadingBayToIdleArgs, LoadingBayToIdleAccounts } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class UnDockTransaction {
    performTransaction(fleetNum: number, starbase: string, starbasePlayer:string, account8:string): TransactionInstruction {
        const args: LoadingBayToIdleArgs = {
            keyIndex: 0
        };

        const accounts: LoadingBayToIdleAccounts = {
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
            starbaseAndStarbasePlayer: {
                starbase: new PublicKey(starbase),//a donde voy //userConfig.starBaseAndStarBasePlayer[1][0]
                starbasePlayer: new PublicKey(starbasePlayer),//a donde voy //userConfig.starBaseAndStarBasePlayer[1][1]
            },
            Account8: new PublicKey(account8),//donde estoy? //userConfig.starBaseAndStarBasePlayer[1][0]
        };
        /**console.log("@@@@@@@@@@@@@@@  UnDockTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner)
        console.log(accounts)
        console.log("###########################")*/

        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = loadingBayToIdle(args, accounts, programId);

        return transactionInstruction;
    }
}

export default UnDockTransaction;