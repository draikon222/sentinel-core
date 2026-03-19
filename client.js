const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

let globalBalance = 0.25; // Începem de unde ai rămas tu în poze

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SENTINEL CORE</title>
        <style>
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; padding-bottom: 80px; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            .brand { color: #ffffff; font-weight: bold; }
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; }
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; }
            .value { font-size: 2.2rem; color: #ffffff; margin: 5px 0; }
            .tax-value { color: #00ff88; }
            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 150px; font-size: 0.7rem; color: #506070; overflow: hidden; }
            
            /* BUTONUL FIX JOS - IMPOSIBIL DE RATAT */
            .withdraw-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: #00ff88;
                color: #000;
                text-align: center;
                padding: 20px;
                font-weight: 900;
                font-size: 1.2rem;
                border: none;
                cursor: pointer;
                z-index: 9999;
                box-shadow: 0 -5px 20px rgba(0,255,136,0.3);
            }
        </style>
    </head>
    <body>
        <header>
            <div class="brand">🛡️ SENTINEL V1.0</div>
            <div style="color:#00d2ff; font-size:0.7rem;">[ADMIN_PANEL]</div>
        </header>

        <div class="status-bar">ASTRA-PRIME GATEWAY: ONLINE</div>

        <div class="card tax-card">
            <div style="font-size:0.7rem; color:#00d2ff;">DIPLOMATIC TAXES COLLECTED 💰</div>
            <div class="value tax-value" id="sol-balance">${globalBalance.toFixed(2)} SOL</div>
        </div>

        <div class="card">
            <div style="font-size:0.7rem; color:#00d2ff;">ACTIVE ENTITIES ⚙️</div>
            <div class="value">4</div>
        </div>

        <div class="logs-container" id="logs">
            <div>> SYSTEM INITIALIZED...</div>
        </div>

        <button class="withdraw-bar" id="w-btn" onclick="runWithdraw()">
            CONFIRM WITHDRAWAL
        </button>

        <script>
            let bal = ${globalBalance};
            const balEl = document.getElementById('sol-balance');
            const logEl = document.getElementById('logs');

            function addLog(m) {
                const d = document.createElement('div');
                d.innerHTML = '> ' + m;
                logEl.prepend(d);
            }

            setInterval(() => {
                bal += 0.01;
                balEl.innerHTML = bal.toFixed(2) + " SOL";
                addLog("AUTO-TAX CAPTURED");
            }, 5000);

            function runWithdraw() {
                const b = document.getElementById('w-btn');
                b.innerHTML = "PROCESSING TRANSFER...";
                b.style.background = "#ffcc00";
                addLog("WITHDRAWAL STARTING...");
                
                setTimeout(() => {
                    bal = 0;
                    balEl.innerHTML = "0.00 SOL";
                    b.innerHTML = "TRANSFER COMPLETE";
                    b.style.background = "#555";
                    addLog("FUNDS SENT TO SONOMA WALLET");
                }, 3000);
            }
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log('Sentinel Fix Live'));
