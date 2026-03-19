const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Sentinel Core</title>
        <style>
            body { background: #0a0a0a; color: #ff3e3e; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .box { border: 1px solid #333; padding: 20px; text-align: center; }
            .status { color: #00ff00; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>SENTINEL CORE</h1>
            <p>PROTOCOL OPERAȚIONAL</p>
            <div class="status">● SISTEM LIVE (ALPHA)</div>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log('Server running');
});
