import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { depositCargoToFleet, DepositCargoToFleetArgs, DepositCargoToFleetAccounts } from "../instructions"
import BN from "bn.js";
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class CargoToFleetTransaction {
    performTransaction(fleetNumber: number, amount: number, cargoPodTo: string, tokenTo: string, cargoType: string, tokenFrom: string, tokenMint: string): TransactionInstruction {
        const args: DepositCargoToFleetArgs = {
            input: { amount: new BN(amount), keyIndex: 0 },
        };

        const accounts: DepositCargoToFleetAccounts = {
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
            fundsTo: userConfig.publicKey,
            starbaseAndStarbasePlayer: {
                starbase: new PublicKey(userConfig.starBaseAndStarBasePlayer[1][0]),
                starbasePlayer: new PublicKey(userConfig.starBaseAndStarBasePlayer[1][1]),
            },
            starbase: new PublicKey(userConfig.starBaseAndStarBasePlayer[1][0]),
            starbasePlayer: new PublicKey(userConfig.starBaseAndStarBasePlayer[1][1]),
            cargoPodFrom: new PublicKey(userConfig.cargoPod),
            cargoPodTo: new PublicKey(cargoPodTo),
            cargoType: new PublicKey(cargoType),
            cargoStatsDefinition: userConfig.cargoStardefinition,
            tokenFrom: new PublicKey(tokenFrom),
            tokenTo: new PublicKey(tokenTo),
            tokenMint: new PublicKey(tokenMint),
            cargoProgram: userConfig.cargoProgram,
            tokenProgram: userConfig.tokenProgram,
            Account18: new PublicKey(userConfig.starBaseAndStarBasePlayer[1][0]),
        };

        /**console.log("@@@@@@@@@@@@@@@  CargoToFleetTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts.gameAccountsFleetAndOwner.gameFleetAndOwner.fleetAndOwner)
        console.log(accounts)
        console.log("###########################")*/

        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = depositCargoToFleet(args, accounts, programId);
        return transactionInstruction;
    }
}

export default CargoToFleetTransaction