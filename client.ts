import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Această linie trimite fișierul tău HTML nou creat către vizitatori
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(port, () => {
  console.log(`Sentinel Core operational pe portul ${port}`);
});
