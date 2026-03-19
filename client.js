const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// Sold persistent pe durata rulării serverului
let globalBalance = 0.00;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SENTINEL | Core System V1.0</title>
        <style>
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            .brand { color: #ffffff; font-weight: bold; letter-spacing: 2px; }
            .connect-btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 5px 10px; font-size: 0.7rem; cursor: pointer; box-shadow: 0 0 5px rgba(0,210,255,0.2); }
            
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; font-weight: bold; }
            
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; position: relative; overflow: hidden; }
            .tax-card::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,255,136,0.05), transparent); animation: sweep 3s infinite; }
            @keyframes sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; align-items: center; }
            .value { font-size: 2.5rem; color: #ffffff; margin: 5px 0; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .tax-value { color: #00ff88; text-shadow: 0 0 10px rgba(0,255,136,0.3); }
            .bump { transform: scale(1.08); color: #fff; text-shadow: 0 0 20px #00ff88; }

            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 180px; font-size: 0.7rem; color: #506070; overflow: hidden; flex-grow: 1; position: relative; }
            .log-entry { margin-bottom: 5px; border-bottom: 1px solid #05101a; padding-bottom: 2px; animation: slideIn 0.3s ease-out; }
            @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .log-highlight { color: #00ff88; font-weight: bold; }

            footer { margin-top: 15px; padding: 10px; font-size: 0.6rem; color: #3a4a5a; border-top: 1px solid #1a2a3a; text-align: justify; opacity: 0.7; }
        </style>
    </head>
    <body>
        <header>
            <div class="brand">🛡️ SENTINEL V1.0</div>
            <button class="connect-btn">CONNECT WALLET</button>
        </header>

        <div class="status-bar">ASTRA-PRIME GATEWAY: ONLINE [SECURED]</div>

        <div class="card tax-card">
            <div class="label">DIPLOMATIC TAXES COLLECTED <span style="font-size:1rem">💰</span></div>
            <div class="value tax-value" id="sol-balance">${globalBalance.toFixed(2)} <span style="font-size:0.8rem">SOL</span></div>
        </div>

        <div class="card">
            <div class="label">ACTIVE ENTITIES <span style="font-size:1rem">⚙️</span></div>
            <div class="value">4</div>
        </div>

        <div style="font-size:0.7rem; color:#00d2ff; margin: 10px 0 5px 0; font-weight: bold;">LIVE_SYSTEM_LOGS:</div>
        <div class="logs-container" id="logs">
            <div class="log-entry">> [SYSTEM] Astra-Prime Link Established...</div>
        </div>

        <footer>
            <span style="color:#00d2ff">[ALERT]</span> All transactions processed via Sonoma Protocol. Sentinel Core is operating in aggressive diplomatic mode. No unauthorized access detected. V1.0 Alpha Build.
        </footer>

        <script>
            let localBalance = ${globalBalance};
            const balanceEl = document.getElementById('sol-balance');
            const logs = document.getElementById('logs');
            
            async function updateServerBalance(amount) {
                try { await fetch('/update-balance?add=' + amount); } catch(e) {}
            }

            const messages = [
                { txt: "SCANNING NETWORK NODES...", val: 0 },
                { txt: "NEGOTIATING WITH BOT_ID_0x7F...", val: 0 },
                { txt: "<span class='log-highlight'>TAX COLLECTED: +0.02 SOL</span>", val: 0.02 },
                { txt: "DIPLOMATIC HANDSHAKE SUCCESSFUL", val: 0.01 },
                { txt: "BYPASSING RELAY SECURITY...", val: 0 },
                { txt: "<span class='log-highlight'>TAX COLLECTED: +0.05 SOL</span>", val: 0.05 },
                { txt: "ASTRA-PRIME PROTOCOL ACTIVE", val: 0 }
            ];

            function addLog() {
                const pick = messages[Math.floor(Math.random() * messages.length)];
                const div = document
