const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// Variabila care salvează soldul pe server (nu se resetează la refresh)
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
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            .brand { color: #ffffff; font-weight: bold; }
            .connect-btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 5px 10px; font-size: 0.7rem; cursor: pointer; }
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; }
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; }
            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; }
            .value { font-size: 2.2rem; color: #ffffff; margin: 5px 0; transition: all 0.2s; }
            .tax-value { color: #00ff88; }
            .bump { transform: scale(1.1); color: #fff; }
            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 180px; overflow-y: hidden; font-size: 0.7rem; color: #506070; }
            .log-entry { margin-bottom: 5px; border-bottom: 1px solid #05101a; padding-bottom: 2px; }
        </style>
    </head>
    <body>
        <header>
            <div class="brand">🛡️ SENTINEL V1.0</div>
            <button class="connect-btn">CONNECT WALLET</button>
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
        <div style="font-size:0.7rem; color:#00d2ff; margin: 15px 0 5px 0;">LIVE_SYSTEM_LOGS:</div>
        <div class="logs-container" id="logs"></div>

        <script>
            let localBalance = ${globalBalance};
            const balanceEl = document.getElementById('sol-balance');
            const logs = document.getElementById('logs');
            
            async function updateServerBalance(amount) {
                await fetch('/update-balance?add=' + amount);
            }

            function addLog() {
                const taxes = [0.01, 0.03, 0.05, 0.02, 0.00, 0.00];
                const amount = taxes[Math.floor(Math.random() * taxes.length)];
                
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = amount > 0 ? '> TAX COLLECTED: +' + amount + ' SOL' : '> SCANNING NETWORK NODES...';
                logs.prepend(div);

                if(amount > 0) {
                    localBalance += amount;
                    balanceEl.innerHTML = localBalance.toFixed(2) + ' <span style="font-size:0.8rem">SOL</span>';
                    balanceEl.classList.add('bump');
                    setTimeout(() => balanceEl.classList.remove('bump'), 200);
                    updateServerBalance(amount); // Trimitem datele la server
                }
                if(logs.children.length > 8) logs.lastChild.remove();
            }
            setInterval(addLog, 5000);
        </script>
    </body>
    </html>
  `);
});

// Endpoint special pentru salvarea banilor pe server
app.get('/update-balance', (req, res) => {
    const toAdd = parseFloat(req.query.add || 0);
    globalBalance += toAdd;
    res.send('ok');
});

app.listen(port, () => { console.log('Persistent Sentinel Live'); });
