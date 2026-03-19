const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

let globalBalance = 0.61; 

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>SENTINEL CORE | Restricted</title>
        <style>
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 0; text-transform: uppercase; overflow: hidden; }
            #login-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #030a11; z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .login-box { width: 85%; max-width: 350px; text-align: center; border: 1px solid #1a2a3a; padding: 30px; background: #05101a; box-shadow: 0 0 20px rgba(0,210,255,0.1); position: relative; }
            
            .input-container { position: relative; margin-bottom: 20px; width: 100%; }
            input { background: #02080e; border: 1px solid #1a2a3a; color: #00ff88; padding: 12px; width: 100%; box-sizing: border-box; text-align: center; font-family: inherit; outline: none; font-size: 1rem; border-radius: 4px; }
            input:focus { border-color: #00d2ff; }
            
            .toggle-password { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #00d2ff; font-size: 1.2rem; z-index: 10; }
            
            .btn-login { background: #00ff88; color: #000; border: none; padding: 15px; width: 100%; font-weight: 900; cursor: pointer; text-transform: uppercase; }
            
            #main-interface { display: none; padding: 15px; height: 100vh; display: flex; flex-direction: column; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; }
            .value { font-size: 2rem; color: #ffffff; margin: 5px 0; }
            .tax-value { color: #00ff88; }
            
            .logs-container { background: #02080e; border: 1px solid #1a2a3a; padding: 10px; height: 120px; font-size: 0.7rem; color: #506070; overflow: hidden; margin-bottom: 20px; }
            
            .withdraw-section { position: fixed; bottom: 0; left: 0; width: 100%; background: #05101a; border-top: 1px solid #1a2a3a; padding: 15px; box-sizing: border-box; }
            .wallet-input { background: #02080e; border: 1px solid #00d2ff; color: #fff; padding: 12px; width: 100%; box-sizing: border-box; font-family: inherit; font-size: 0.8rem; margin-bottom: 10px; text-align: left; text-transform: none; }
            .withdraw-btn { background: #00ff88; color: #000; border: none; padding: 15px; width: 100%; font-weight: 900; font-size: 1rem; cursor: pointer; text-transform: uppercase; }
        </style>
    </head>
    <body>
        <div id="login-screen">
            <div class="login-box">
                <div style="color:#00d2ff; font-size:1.2rem; margin-bottom:10px;">SENTINEL V1.0</div>
                <div style="font-size:0.6rem; color:#506070; margin-bottom:25px;">[SECURED ACCESS]</div>
                <div class="input-container">
                    <input type="password" id="key" placeholder="LICENSE KEY" autocomplete="off">
                    <span class="toggle-password" onclick="togglePass()">👁️</span>
                </div>
                <button class="btn-login" onclick="validate()">INITIALIZE NODES</button>
                <div id="err" style="color:#ff4444; font-size:0.7rem; margin-top:15px;"></div>
            </div>
        </div>

        <div id="main-interface" style="display:none;">
            <header>
                <div style="color:#fff; font-weight:bold;">🛡️ SENTINEL V1.0</div>
                <div style="color:#00d2ff; font-size:0.7rem;">ONLINE</div>
            </header>

            <div class="card tax-card">
                <div style="font-size:0.7rem; color:#00d2ff;">DIPLOMATIC TAXES COLLECTED</div>
                <div class="value tax-value" id="sol-balance">${globalBalance.toFixed(2)} SOL</div>
            </div>

            <div class="logs-container" id="logs">
                <div>> SYSTEM READY...</div>
            </div>

            <div class="withdraw-section">
                <div style="font-size:0.6rem; color:#a1b0c0; margin-bottom:5px;">RECIPIENT WALLET ADDRESS (SOL):</div>
                <input type="text" class="wallet-input" id="wallet-addr" placeholder="ex: 7xKX...j9pL" autocomplete="off">
                <button class="withdraw-btn" id="w-btn" onclick="runWithdraw()">Confirm Withdrawal</button>
            </div>
        </div>

        <script>
            let currentBal = ${globalBalance};
            
            function togglePass() {
                const input = document.getElementById('key');
                const icon = document.querySelector('.toggle-password');
                input.type = input.type === "password" ? "text" : "password";
                icon.innerHTML = input.type === "password" ? "👁️" : "🔒";
                input.focus();
            }

            function validate() {
                if(document.getElementById('key').value === "SENTINEL-2026") {
                    document.getElementById('login-screen').style.display = 'none';
                    document.getElementById('main-interface').style.display = 'flex';
                    startEngine();
                } else {
                    document.getElementById('err').innerText = "INVALID KEY";
                }
            }

            function startEngine() {
                const balEl = document.getElementById('sol-balance');
                const logEl = document.getElementById('logs');
                setInterval(() => {
                    currentBal += 0.02;
                    balEl.innerHTML = currentBal.toFixed(2) + " SOL";
                    const div = document.createElement('div');
                    div.innerHTML = "> INTERCEPTING: +" + (Math.random() * 0.04).toFixed(2) + " SOL";
                    logEl.prepend(div);
                    if(logEl.children.length > 6) logEl.lastChild.remove();
                }, 3500);
            }

            function runWithdraw() {
                const addr = document.getElementById('wallet-addr').value;
                const btn = document.getElementById('w-btn');
                
                if(addr.length < 10) {
                    alert("INVALID WALLET ADDRESS");
                    return;
                }

                btn.innerHTML = "VALIDATING ADDRESS...";
                btn.style.background = "#00d2ff";
                
                setTimeout(() => {
                    btn.innerHTML = "TRANSFERRING SOL...";
                    btn.style.background = "#ffcc00";
                    
                    setTimeout(() => {
                        currentBal = 0;
                        document.getElementById('sol-balance').innerHTML = "0.00 SOL";
                        btn.innerHTML = "SUCCESSFULLY SENT";
                        btn.style.background = "#555";
                    }, 3000);
                }, 2000);
            }

            window.onload = () => { document.getElementById('key').focus(); };
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log('Sentinel Live'));
