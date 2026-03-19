// ... restul codului ramane la fel pana la stiluri ...
<style>
    body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; }
    
    /* REPARARE HEADER SI BUTOANE */
    header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        border-bottom: 1px solid #1a2a3a; 
        padding-bottom: 15px; 
        margin-bottom: 20px;
    }
    .brand { color: #ffffff; font-weight: bold; font-size: 1rem; }
    
    .top-btns { 
        display: flex; 
        gap: 10px; 
        z-index: 999; /* Il punem deasupra oricarui alt element */
    }
    
    .withdraw-btn { 
        background: #00ff88; /* Verde solid sa il vezi clar acum */
        color: #000 !important; 
        border: none; 
        padding: 8px 12px; 
        font-size: 0.75rem; 
        font-weight: 900; 
        cursor: pointer;
        border-radius: 2px;
    }
    
    .connect-btn { 
        background: transparent; 
        border: 1px solid #00d2ff; 
        color: #00d2ff; 
        padding: 8px 12px; 
        font-size: 0.75rem;
    }
// ... restul de CSS (card, logs, etc) ...
</style>

<body>
    <header>
        <div class="brand">🛡️ SENTINEL V1.0</div>
        <div class="top-btns">
            <button class="withdraw-btn" id="w-btn" onclick="executeWithdraw()">WITHDRAW</button>
            <button class="connect-btn">CONNECT</button>
        </div>
    </header>
// ... restul corpului HTML ...
