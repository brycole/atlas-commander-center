import { TransactionInstruction } from "@solana/web3.js";
import * as userConfig from "../userConfig";
import * as web3 from '@solana/web3.js';

class Signer {
    async signer(trans: TransactionInstruction[]): Promise<string> {
        const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
        const tx = new web3.Transaction();

        trans.forEach((tran, index) => {
            tx.add(tran)
        });

        const recentBlockhash = await connection.getLatestBlockhash();
        tx.recentBlockhash = recentBlockhash.blockhash;
        
        try {
            const signature = await web3.sendAndConfirmTransaction(connection, tx, [userConfig.privateKey],{
                maxRetries: 3,
              });
            return signature;
        } catch (error) {
            console.error('Error al enviar y confirmar la transacción:', error);
            throw error;
        }
    }
}

export default Signer;