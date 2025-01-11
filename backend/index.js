const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '21042018',      
  database: 'hest' 
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Endpoint para pegar dados
app.get('/users', (req, res) => {
  db.query('SELECT * FROM funcionario', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar dados');
      return;
    }
    res.json(results);
  });
});


app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar dados');
      return;
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
