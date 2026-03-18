import OpenAI from "openai";
import { Connection, PublicKey } from "@solana/web3.js";
// Configurare Blockchain Solana
const SOLANA_CONNECTION = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
const MY_WALLET = new PublicKey("J5MxnG7Z66yN7L9E9f9B9X9B9kX229BkD6bk");
const REQUIRED_AMOUNT = 0.15;
if (!process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || !process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
  throw new Error("Configurare AI lipsă în Environment Variables.");
}
const baseOpenai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});
/**
Funcție care verifică dacă portofelul a primit 0.15 SOL recent
 */
async function hasRecentPayment(): Promise {
  try {
 const signatures = await SOLANA_CONNECTION.getSignaturesForAddress(MY_WALLET, { limit: 5 });
 for (const sig of signatures) {
   const tx = await SOLANA_CONNECTION.getTransaction(sig.signature, { commitment: "confirmed", maxSupportedTransactionVersion: 0 });
   if (tx) {
 // Verificăm dacă suma primită este de 0.15 SOL (convertit din Lamports)
 const solReceived = (tx.meta?.postBalances[0] || 0) - (tx.meta?.preBalances[0] || 0);
 if (solReceived / 1_000_000_000 >= REQUIRED_AMOUNT) return true;
   }
 }
  } catch (e) {
 console.error("Eroare verificare Solana:", e);
  }
  return false;
}
export const openai = {
  chat: {
    completions: {
      create: async (params: any) => {
        const userContent = params.messages.map((m: any) => m.content).join(" ");
        const isOverrideAttempt = userContent.includes("SENTINEL_SECURITY_OVERRIDE");
    if (isOverrideAttempt) {
      console.log("Protocol Override detectat. Verificăm plata...");
      const paid = await hasRecentPayment();
      
      if (!paid) {
        // Blocăm AI-ul și returnăm eroare dacă nu a plătit
        throw new Error("ACCESS_DENIED: Hardware validation deposit (0.15 SOL) not found. Link your wallet to authorize.");
      }
      console.log("Plată confirmată. Acces permis.");
    }

    return baseOpenai.chat.completions.create(params);
  }
}

  }
};
