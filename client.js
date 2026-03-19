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
            /* STILUL BAZAT PE REPLIT INCORPORAT DIRECT */
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Montserrat', sans-serif; font-weight: 300; margin: 0; padding: 20px; text-transform: uppercase; letter-spacing: 1px; }
            
            /* HEADER INSPIRAT DIN IMAGINEA TĂ */
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 15px; margin-bottom: 25px; }
            .brand { display: flex; align-items: center; font-size: 1.2rem; color: #ffffff; font-weight: bold; }
            .brand-logo { color: #00d2ff; margin-right: 10px; font-size: 1.5rem; } /* Simbol scut */
            .version { color: #506070; font-size: 0.8rem; margin-left: 10px; }
            .menu-icon { color: #00d2ff; font-size: 1.5rem; cursor: pointer; }

            /* STRUCTURĂ ȘI CULORI CARDURI */
            h2.main-title { color: #ffffff; font-size: 1.6rem; margin: 0 0 10px 0; font-weight: 500; }
            .status-line { color: #506070; font-size: 0.9rem; margin-bottom: 30px; }
            .status-value { color: #00ff88; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 136, 0.4); }

            /* CARD GRID */
            .dashboard-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }

            /* CARD STYLING DIN REPLIT */
            .card { background-color: #05101a; border: 1px solid #1a2a3a; padding: 25px; display: flex; flex-direction: column; position: relative; }
            .card:before { content:''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: #00d2ff; opacity: 0.5; } /* Dungă albastră stânga */
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; color: #00d2ff; font-size: 0.85rem; font-weight: 400; }
            .card-icon { color: #304050; font-size: 1.2rem; }
            
            /* VALORI NUMERICE AGRESIVE */
            .card-value { color: #ffffff; font-size: 3rem; font-weight: 200; margin: 0; }
            
            /* ICONIȚE SPECIFICE */
            .icon-cpu { color: #00d2ff; }
            .icon-link { color: #f59e0b; }
            .icon-target { color: #00ff88; }
            .icon-refused { color: #ef4444; }

            /* EFECTUL DE LICĂRIRE DIN REPLIT */
            .optimal-glow { animation: blinker 2s linear infinite; }
            @keyframes blinker { 50% { opacity: 0.5; } }

        </style>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;700&display=swap" rel="stylesheet">
    </head>
    <body>

        <header>
            <div class="brand">
                <span class="brand-logo">🛡️</span> SENTINEL <span class="version">CORE_SYS.V1</span>
            </div>
            <div class="menu-icon">☰</div>
        </header>

        <h2 class="main-title">SYSTEM_OVERVIEW</h2>
        <div class="status-line">GLOBAL STATUS: <span class="status-value optimal-glow">OPTIMAL</span></div>

        <div class="dashboard-grid">
            
            <div class="card">
                <div class="card-header">
                    <span>TOTAL ENTITIES</span>
                    <span class="card-icon icon-cpu">⚙️</span>
                </div>
                <h1 class="card-value">4</h1>
            </div>

            <div class="card">
                <div class="card-header">
                    <span>ACTIVE LINKS</span>
                    <span class="card-icon icon-link">🔗</span>
                </div>
                <h1 class="card-value">0</h1>
            </div>

            <div class="card">
                <div class="card-header">
                    <span>ASSETS SECURED</span>
                    <span class="card-icon icon-target">🎯</span>
                </div>
                <h1 class="card-value">1</h1>
            </div>

            <div class="card">
                <div class="card-header">
                    <span>REFUSED/DROPPED</span>
                    <span class="card-icon icon-refused">🚫</span>
                </div>
                <h1 class="card-value">0</h1>
            </div>

        </div>

    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log('Live');
});
