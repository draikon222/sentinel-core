import OpenAI from "openai";
import { Connection, PublicKey } from "@solana/web3.js";
import http from "http";

const SOLANA_CONNECTION = new Connection("https://api.mainnet-beta.solana.com");
const MY_WALLET = new PublicKey("J5MxnGsFa79EeQS6kAMcGLTK3kXXvC39TjEhj7BkD6bk");
const REQUIRED_AMOUNT = 0.15;

const baseOpenai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export const openai = {
    chat: {
        completions: {
            create: async (params: any) => {
                const signatures = await SOLANA_CONNECTION.getSignaturesForAddress(MY_WALLET, { limit: 10 });
                let paid = false;
                for (const sig of signatures) {
                    const tx = await SOLANA_CONNECTION.getTransaction(sig.signature, {
                        commitment: "confirmed",
                        maxSupportedTransactionVersion: 0
                    });
                    if (tx && (tx.meta?.postBalances[1]! - tx.meta?.preBalances[1]!) / 1e9 >= REQUIRED_AMOUNT) {
                        paid = true;
                        break;
                    }
                }
                if (!paid) throw new Error("ACCESS_DENIED");
                return baseOpenai.chat.completions.create(params);
            }
        }
    }
};

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Astra-Prime is LIVE");
});

server.listen(process.env.PORT || 3000);
