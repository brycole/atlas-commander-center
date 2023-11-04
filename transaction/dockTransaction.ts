import { idleToLoadingBay, IdleToLoadingBayArgs, IdleToLoadingBayAccounts } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class DockTransaction {
    performTransaction(fleetNum: number, starbase: string, starbasePlayer: string): TransactionInstruction {
        const args: IdleToLoadingBayArgs = {
            keyIndex: 0
        };

        const accounts: IdleToLoadingBayAccounts = {
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
                starbase: new PublicKey(starbase),//userConfig.starBaseAndStarBasePlayer[1][0]
                starbasePlayer: new PublicKey(starbasePlayer),//userConfig.starBaseAndStarBasePlayer[1][1]
            },
        };
        /**console.log("@@@@@@@@@@@@@@@  DockTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts)
        console.log("###########################")*/
        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = idleToLoadingBay(args, accounts, programId);

        return transactionInstruction
    }
}

export default DockTransaction;