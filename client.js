
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
        <title>SENTINEL | Core System V1</title>
        <style>
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Montserrat', sans-serif; margin: 0; padding: 20px; text-transform: uppercase; letter-spacing: 1px; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 15px; margin-bottom: 25px; }
            .brand { display: flex; align-items: center; font-size: 1.1rem; color: #ffffff; font-weight: bold; }
            
            /* BUTON PORTOFEL */
            .connect-btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 8px 15px; cursor: pointer; font-size: 0.7rem; font-family: inherit; transition: 0.3s; }
            .connect-btn:hover { background: #00d2ff; color: #030a11; box-shadow: 0 0 15px #00d2ff; }

            .dashboard-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
            .card { background-color: #05101a; border: 1px solid #1a2a3a; padding: 20px; position: relative; }
            .card:before { content:''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: #00d2ff; }
            
            .card-header { display: flex; justify-content: space-between; color: #00d2ff; font-size: 0.8rem; margin-bottom: 10px; }
            .card-value { color: #ffffff; font-size: 2.5rem; font-weight: 200; margin: 0; }
            .unit { font-size: 0.9rem; color: #506070; margin-left: 5px; }

            /* TAXE DIPLOMATICE */
            .tax-card { border: 1px solid #00ff88; }
            .tax-card:before { background: #00ff88; }
            .tax-value { color: #00ff88; }

            .status-line { margin-bottom: 20px; font-size: 0.8rem; }
            .status-value { color: #00ff88; font-weight: bold; }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap" rel="stylesheet">
    </head>
    <body>

        <header>
            <div class="brand">🛡️ SENTINEL <span style="color:#506070; margin-left:10px;">V1.0</span></div>
            <button class="connect-btn" id="walletBtn" onclick="connectWallet()">CONNECT WALLET</button>
        </header>

        <div class="status-line">ASTRA-PRIME GATEWAY: <span class="status-value">ONLINE</span></div>

        <div class="dashboard-grid">
            
            <div class="card tax-card">
                <div class="card-header">
                    <span>DIPLOMATIC TAXES COLLECTED</span>
                    <span>💰</span>
                </div>
                <h1 class="card-value tax-value" id="balance">0.00 <span class="unit">SOL</span></h1>
            </div>

            <div class="card">
                <div class="card-header"><span>ACTIVE ENTITIES</span><span>⚙️</span></div>
                <h1 class="card-value">4</h1>
            </div>

            <div class="card">
                <div class="card-header"><span>SECURED ASSETS</span><span>🔒</span></div>
                <h1 class="card-value">1</h1>
            </div>

        </div>

        <script>
            // Logica inițială pentru portofel
            async function connectWallet() {
                if (window.ethereum) {
                    try {
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        document.getElementById('walletBtn').innerText = accounts[0].substring(0, 6) + '...' + accounts[0].substring(38);
                        alert('Portofel conectat la Sentinel Core!');
                    } catch (err) {
                        alert('Conectare respinsă.');
                    }
                } else {
                    alert('Instalează MetaMask sau un portofel crypto!');
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => { console.log('Sentinel Web3 Live'); });
