// ... (păstrează restul de CSS și HTML până la <body>)

<body>
    <div id="login-screen" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#030a11; z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; box-sizing:border-box;">
        <div style="color:#00ff88; font-size:1.5rem; margin-bottom:20px; font-weight:bold;">🛡️ SENTINEL CORE V1.0</div>
        <div style="color:#a1b0c0; font-size:0.8rem; margin-bottom:30px;">[RESTRICTED ACCESS - ASTRA-PRIME GATEWAY]</div>
        
        <input type="text" id="license-key" placeholder="ENTER LICENSE KEY" style="background:transparent; border:1px solid #1a2a3a; color:#00ff88; padding:15px; width:80%; max-width:300px; text-align:center; font-family:'Courier New'; margin-bottom:20px; outline:none;">
        
        <button onclick="checkLicense()" style="background:#00d2ff; color:#000; border:none; padding:15px 30px; font-weight:bold; cursor:pointer; width:80%; max-width:300px;">INITIALIZE CONNECTION</button>
        
        <div id="login-status" style="margin-top:20px; color:#ff4444; font-size:0.7rem;"></div>
    </div>

    <div id="main-interface" style="display:none;">
        <header>
            <div class="brand">🛡️ SENTINEL V1.0</div>
            <div style="color:#00d2ff; font-size:0.7rem;">[ADMIN_PANEL]</div>
        </header>
        </div>

    <script>
        function checkLicense() {
            const key = document.getElementById('license-key').value;
            const status = document.getElementById('login-status');
            
            // Setăm o cheie simbolică, de exemplu "SENTINEL-2026"
            if(key === "SENTINEL-2026") {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('main-interface').style.display = 'block';
                startSystem(); // Pornim scriptul de generare SOL
            } else {
                status.innerHTML = "ACCESS DENIED: INVALID ENCRYPTION KEY";
                setTimeout(() => { status.innerHTML = ""; }, 2000);
            }
        }

        function startSystem() {
            let bal = 0.61; // Începem de la valoarea din clipul tău
            const balEl = document.getElementById('sol-balance');
            const logEl = document.getElementById('logs');

            function addLog(m) {
                const d = document.createElement('div');
                d.innerHTML = '> ' + m;
                logEl.prepend(d);
            }

            setInterval(() => {
                bal += 0.03; // Creștem rapid ca în video
                balEl.innerHTML = bal.toFixed(2) + " SOL";
                addLog("AUTO-TAX CAPTURED: +" + (0.01 + Math.random()*0.05).toFixed(2) + " SOL");
            }, 4000);
        }
        // ... păstrează funcția runWithdraw() ...
    </script>
</body>
