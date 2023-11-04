import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js"
import * as userConfig from "../userConfig";
import {PROGRAM_ID }from "../programId"

class AssociatedAccountTransaction {
    performTransaction(resourceFleetCargoPodTo:string, tankFleetResource:string, tokenResource: string): TransactionInstruction {
        const accounts: CreateAssociationAccount = {
          Account1: userConfig.publicKey,
          Account2: new PublicKey(resourceFleetCargoPodTo),
          Account3: new PublicKey(tankFleetResource),
          Account4: new PublicKey(tokenResource),
          Account5: new PublicKey("11111111111111111111111111111111"),
          Account6: userConfig.tokenProgram,
        };
        /**console.log("@@@@@@@@@@@@@@@  AssociatedAccountTransaction  @@@@@@@@@@@@@@@@@@@")
        console.log(accounts)
        console.log("###########################")*/

        const AssociatedToken = userConfig.associatedToken;
        const transactionInstruction = createAssociationAccount(accounts, AssociatedToken, );
        return transactionInstruction;
      }
}

interface CreateAssociationAccount {
    Account1: PublicKey
    Account2: PublicKey
    Account3: PublicKey
    Account4: PublicKey
    Account5: PublicKey
    Account6: PublicKey
  
  }
  
  function createAssociationAccount(
    accounts: CreateAssociationAccount,
    programId: PublicKey
  ) {
    const keys: Array<AccountMeta> = [
      {
        pubkey: accounts.Account1,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: accounts.Account2,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: accounts.Account3,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: accounts.Account4,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: accounts.Account5,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: accounts.Account6,
        isSigner: false,
        isWritable: false,
      },
  
    ]
    const identifier = Buffer.from([0x01]);
    
    // Aquí necesitas determinar cómo construir el buffer según tus necesidades.
    
    const data = Buffer.concat([identifier]);
    const ix = new TransactionInstruction({ keys, programId, data})
    return ix
  }

export default AssociatedAccountTransaction;