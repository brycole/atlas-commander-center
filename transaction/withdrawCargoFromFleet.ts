import { withdrawCargoFromFleet, WithdrawCargoFromFleetArgs, WithdrawCargoFromFleetAccounts } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import BN from "bn.js";
import {PROGRAM_ID }from "../programId"


class WithdrawCargoFromFleet {
    async performTransaction(fleetNum: number, amount: number, cargoPod: string, tokenTo: string, cargoType: string, tokenFrom: string, tokenMint: string, startbase: string, starbaseplayer: string, account18:string): Promise<TransactionInstruction> {
        const args: WithdrawCargoFromFleetArgs = {
            input: { amount: new BN(amount), keyIndex: 0 },
        };

        const accounts: WithdrawCargoFromFleetAccounts = {
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
            fundsTo: userConfig.publicKey,
            starbaseAndStarbasePlayer: {
                starbase: new PublicKey(startbase),//userConfig.starBaseAndStarBasePlayer[1][0]
                starbasePlayer: new PublicKey(starbaseplayer),//userConfig.starBaseAndStarBasePlayer[1][1]
            },
            cargoPodFrom: new PublicKey(cargoPod),
            cargoPodTo: new PublicKey(userConfig.cargoPod),
            cargoType: new PublicKey(cargoType),
            cargoStatsDefinition: userConfig.cargoStardefinition,
            tokenFrom: new PublicKey(tokenFrom),
            tokenTo: new PublicKey(tokenTo),
            tokenMint: new PublicKey(tokenMint),
            cargoProgram: userConfig.cargoProgram,
            tokenProgram: userConfig.tokenProgram,
            Account18: new PublicKey(account18),//userConfig.starBaseAndStarBasePlayer[1][0]
        };
        /**console.log("@@@@@@@@@@@@@@@  WithdrawCargoFromFleet  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner)
        console.log(accounts)
        console.log("###########################")*/
        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = withdrawCargoFromFleet(args, accounts, programId);
        return transactionInstruction;
    }
}

export default WithdrawCargoFromFleet;