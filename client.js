const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

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
            body { background-color: #030a11; color: #a1b0c0; font-family: 'Courier New', monospace; margin: 0; padding: 15px; text-transform: uppercase; display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; }
            header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a2a3a; padding-bottom: 10px; margin-bottom: 20px; }
            .brand { color: #ffffff; font-weight: bold; }
            .top-btns { display: flex; gap: 8px; }
            .btn { background: transparent; border: 1px solid #00d2ff; color: #00d2ff; padding: 5px 8px; font-size: 0.65rem; cursor: pointer; font-weight: bold; }
            .withdraw-btn { border-color: #00ff88; color: #00ff88; box-shadow: 0 0 5px rgba(0,255,136,0.2); }
            
            .status-bar { font-size: 0.8rem; margin-bottom: 15px; color: #00ff88; }
            
            .card { background: #05101a; border: 1px solid #1a2a3a; padding: 15px; margin-bottom: 10px; border-left: 3px solid #00d2ff; }
            .tax-card { border-left: 3px solid #00ff88; }
            .label { font-size: 0.7rem; color: #00d2ff; display: flex; justify-content: space-between; }
            .value { font-size: 2.2rem; color: #ffffff; margin: 5px 0; transition: all 0.3s; }
            .tax-value { color: #00ff88; }
            
            .bump { transform: scale(1.05); color: #fff; }
            .drain { transform: scale(0.9); color: #ff4444; opacity: 0
