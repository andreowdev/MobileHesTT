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

app.get("/financeiro", (req, res) => {
  // Verificando se o parâmetro _dataMovimento foi passado na query
  const { dataMovimento } = req.query;

  // Se a data não for passada, podemos fazer a chamada sem ela, dependendo da lógica
  // Caso contrário, passamos a data como parâmetro para a stored procedure
  db.query("CALL sp_FinanceiroMovimento_Realizado(?)", [dataMovimento || null], (err, results) => {
    if (err) {
      console.error("Erro ao consultar dados:", err);
      return res.status(500).send("Erro ao consultar dados");
    }
    
    // Enviando os resultados para o cliente
    res.json(results[0]); // Resultados geralmente estão na primeira posição do array
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
