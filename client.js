const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// Sold persistent pe server
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
            .top-btns { display: flex; gap: 10px; }
            .btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 5px 10px; font-size: 0.7rem; cursor: pointer; text-transform: uppercase; }
            .withdraw-btn { border-color: #00ff88; color: #00ff88; }
            .withdraw-btn:hover { background: rgba(0,255,136,0.1); }
            
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; font-weight: bold; }
            
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; position: relative; }
            .tax-card::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0,255,136,0.05), transparent); animation: sweep 3s infinite; }
            @keyframes sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; align-items: center; }
            .value { font-size: 2.5rem; color: #ffffff; margin: 5px 0; transition: all 0.2s; }
            .tax-value { color: #00ff88; text-shadow: 0 0 10px rgba(0,255,136,0.3); }
            .bump { transform: scale(1.1); color: #fff; text-shadow: 0 0 20px #00ff88; }
            .withdraw-bump { transform: scale(0.9); color: #ef4444; text-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }

            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 160px; font-size: 0.7rem; color: #506070; overflow: hidden; flex-grow: 1; }
            .log-entry { margin-bottom: 5px; border-bottom: 1px solid #05101a; padding-bottom: 2px; }
            .log-highlight { color: #00ff88; font-weight: bold; }
            .log-withdraw { color: #ef4444; font-weight: bold; }

            footer { margin-top: 15px; padding: 10px; font-size: 0.6rem; color: #3a4a5a; border-top: 1px solid #1a2a3a; text-align: justify; opacity: 0.7; }
        </style>
    </head>
    <body>
        <header>
            <div class="brand">🛡️ SENTINEL V1.0</div>
            <div class="top-btns">
                <button class="btn withdraw-btn" id="withdrawBtn" onclick="requestWithdraw()">WITHDRAW</button>
                <button class="btn">CONNECT</button>
            </div>
        </header>

        <div class="status-bar">ASTRA-PRIME GATEWAY: ONLINE</div>

        <div class="card tax-card">
            <div class="label">DIPLOMATIC TAXES COLLECTED 💰</div>
            <div class="value tax-value" id="sol-balance">${globalBalance.toFixed(2)} <span style="font-size:0.8rem">SOL</span></div>
        </div>

        <div class="card">
            <div class="label">ACTIVE ENTITIES ⚙️</div>
            <div class="value">4</div>
        </div>

        <div style="font-size:0.7rem; color:#00d2ff; margin: 10px 0 5px 0; font-weight: bold;">LIVE_SYSTEM_LOGS:</div>
        <div class="logs-container" id="logs">
            <div class="log-entry">> [SYSTEM] Sentinel Core Alpha Booted.</div>
        </div>

        <footer>
            <span style="color:#00d2ff">[ALERT]</span> All processes monitored by Astra-Prime Protocol. Diplomatic Tax Protocol Alpha is active. Withdrawal simulation module enabled for testing. V1.0 Build.
        </footer>

        <script>
            let localBalance = ${globalBalance};
            const balanceEl = document.getElementById('sol-balance');
            const logs = document.getElementById('logs');
            let isWithdrawing = false;
            
            async function updateServerBalance(addAmount = 0, removeAmount = 0) {
                try { 
                    await fetch('/update-balance?add=' + addAmount + '&remove=' + removeAmount); 
                } catch(e) {}
            }

            function addLog(message) {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = '> ' + message;
                logs.prepend(div);
                if(logs.children.length > 8) logs.lastChild.remove();
            }

            const messages = [
                { txt: "SCANNING NETWORK NODES...", val: 0 },
                { txt: "DIPLOMATIC HANDSHAKE WITH BOT_0x9C...", val: 0 },
                { txt: "<span class='log-highlight'>TAX COLLECT
