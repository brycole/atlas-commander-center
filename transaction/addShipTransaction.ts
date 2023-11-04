import { addShipToFleet, AddShipToFleetArgs, AddShipToFleetAccounts } from "../instructions"
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class AddShipTransaction {
    performTransaction(fleetNum: number, starbase: string, starbasePlayer: string): TransactionInstruction {
        const args: AddShipToFleetArgs = {
           input: {shipAmount: 1, shipEscrowIndex: 0, fleetShipInfoIndex: 0, keyIndex: 0}
        };

        const accounts: AddShipToFleetAccounts = {
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
            funder:  userConfig.publicKey,
            fleetShips: new PublicKey("Dg96UDcF3jsQ2R1zPMHUzecL9UJPWu23wLkYbP4y15R9"),
            ship: new PublicKey("69JP1ZkbQveWeed8snWg3eJTo5BFZXyTS3F1aNdCxF4x"),
            starbaseAndStarbasePlayer: {
                starbase: new PublicKey(starbase),//userConfig.starBaseAndStarBasePlayer[1][0]
                starbasePlayer: new PublicKey(starbasePlayer),//userConfig.starBaseAndStarBasePlayer[1][1]
            },
            systemProgram: new PublicKey("11111111111111111111111111111111"),
            Account12: new PublicKey("J8aYFqhRnMmT5MUJg6JhBFUWJMty7VRTMZMpsJA56ttG")
        };
        /**console.log("@@@@@@@@@@@@@@@  DockTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts)
        console.log("###########################")*/
        const programId = new PublicKey(PROGRAM_ID);
        const transactionInstruction = addShipToFleet(args, accounts, programId);

        return transactionInstruction
    }
}

export default AddShipTransaction;