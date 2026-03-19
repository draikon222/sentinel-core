const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <title>Sentinel Core | Operational</title>
        <style>
            body { background: #0a0a0a; color: #ffffff; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .box { border: 2px solid #ff3e3e; padding: 40px; text-align: center; box-shadow: 0 0 20px rgba(255, 62, 62, 0.2); }
            h1 { color: #ff3e3e; font-size: 2rem; letter-spacing: 5px; margin: 0; }
            p { color: #888; margin: 20px 0; }
            .status { color: #00ff00; font-weight: bold; border: 1px solid #00ff00; padding: 5px 10px; display: inline-block; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>SENTINEL CORE</h1>
            <p>PROTOCOL DE INVESTIȚII ALPHA</p>
            <div class="status">● SISTEM LIVE</div>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log('Serverul a pornit pe portul ' + port);
});
