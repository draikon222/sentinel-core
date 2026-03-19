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
            .tax-card { border-left: 3px solid #00ff88; }
            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; }
            .value { font-size: 2.2rem; color: #ffffff; margin: 5px 0; }
            .tax-value { color: #00ff88; }

            /* LOGS SECTION */
            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 150px; overflow-y: hidden; font-size: 0.7rem; color: #506070; }
            .log-entry { margin-bottom: 5px; border-bottom: 1px solid #05101a; padding-bottom: 2px; }
            .log-entry span { color: #00ff88; }
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
            <div class="value tax-value">0.00 <span style="font-size:0.8rem">SOL</span></div>
        </div>

        <div class="card">
            <div class="label">ACTIVE ENTITIES ⚙️</div>
            <div class="value">4</div>
        </div>

        <div style="font-size:0.7rem; color:#00d2ff; margin: 15px 0 5px 0;">LIVE_SYSTEM_LOGS:</div>
        <div class="logs-container" id="logs">
            <div class="log-entry">> Initializing Sentinel Core...</div>
            <div class="log-entry">> Astra-Prime Gateway connected.</div>
            <div class="log-entry">> Scanning for diplomatic opportunities...</div>
        </div>

        <script>
            const logs = document.getElementById('logs');
            const messages = [
                "Negotiating with External_Node_88...",
                "Diplomatic tax applied: +0.02 SOL",
                "Entity #4 status: OPTIMAL",
                "Asset secured via Astra-Prime.",
                "Tax collection successful.",
                "Bypassing standard protocols..."
            ];

            setInterval(() => {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = '> ' + messages[Math.floor(Math.random() * messages.length)];
                logs.prepend(div);
                if(logs.children.length > 8) logs.lastChild.remove();
            }, 4000);
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => { console.log('Final Build Live'); });
