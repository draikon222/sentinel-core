const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SENTINEL | Core System V1.0</title>
        <style>
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            .brand { color: #ffffff; font-weight: bold; display: flex; align-items: center; }
            .connect-btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 5px 10px; font-size: 0.7rem; cursor: pointer; }
            
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; }
            
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; position: relative; }
            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; }
            .value { font-size: 2.2rem; color: #ffffff; margin: 5px 0; transition: all 0.2s; }
            .tax-value { color: #00ff88; text-shadow: 0 0 5px rgba(0,255,136,0.2); }
            .bump { transform: scale(1.05); color: #fff; }

            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 180px; overflow-y: hidden; font-size: 0.7rem; color: #506070; }
            .log-entry { margin-bottom: 5px; border-bottom: 1px solid #05101a; padding-bottom: 2px; animation: fadeIn 0.3s forwards; }
            @keyframes fadeIn { from { opacity: 0; transform: translateX(-5px); } to { opacity: 1; transform: translateX(0); } }
        </style>
    </head>
    <body>
        <header>
            <div class="brand">🛡️ SENTINEL <span style="color:#506070; margin-left:5px;">V1.0</span></div>
            <button class="connect-btn">CONNECT WALLET</button>
        </header>

        <div class="status-bar">ASTRA-PRIME GATEWAY: ONLINE</div>

        <div class="card tax-card">
            <div class="label">DIPLOMATIC TAXES COLLECTED 💰</div>
            <div class="value tax-value" id="sol-balance">0.00 <span style="font-size:0.8rem">SOL</span></div>
        </div>

        <div class="card">
            <div class="label">ACTIVE ENTITIES ⚙️</div>
            <div class="value">4</div>
        </div>

        <div style="font-size:0.7rem; color:#00d2ff; margin: 15px 0 5px 0;">LIVE_SYSTEM_LOGS:</div>
        <div class="logs-container" id="logs">
            <div class="log-entry">> Initializing Sentinel Core...</div>
        </div>

        <script>
            let currentBalance = 0.00;
            const balanceEl = document.getElementById('sol-balance');
            const logs = document.getElementById('logs');
            
            const messages = [
                { txt: "Negotiating with Node_0x71...", val: 0 },
                { txt: "Astra-Prime tax intercepted: +0.03 SOL", val: 0.03 },
                { txt: "Diplomatic handshake confirmed.", val: 0.01 },
                { txt: "Bypassing relay security...", val: 0 },
                { txt: "New asset identified by Sentinel.", val: 0 },
                { txt: "Inbound fee collected: +0.06 SOL", val: 0.06 }
            ];

            function addLog() {
                const pick = messages[Math.floor(Math.random() * messages.length)];
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = '> ' + pick.txt;
                logs.prepend(div);
                
                if(pick.val > 0) {
                    currentBalance += pick.val;
                    balanceEl.innerHTML = currentBalance.toFixed(2) + ' <span style="font-size:0.8rem">SOL</span>';
                    balanceEl.classList.add('bump');
                    setTimeout(() => balanceEl.classList.remove('bump'), 200);
                }

                if(logs.children.length > 10) logs.lastChild.remove();
            }

            setInterval(addLog, 4500); // Adaugă un log și updatează banii la fiecare 4.5 secunde
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => { console.log('Aggressive Build Live'); });
