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
  password: '01042018',      
  database: 'hest' 
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

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
  const { dataMovimento, ano, mes } = req.query;

  db.query("CALL sp_FinanceiroMovimento_Realizado(?, ?, ?)",
    [dataMovimento, ano, mes],  (err, results) => {
    if (err) {
      console.error("Erro ao consultar dados:", err);
      return res.status(500).send("Erro ao consultar dados");
    }
    
    res.json(results[0]); 
  });
});

app.get("/pedidos", (req, res) => {

    const {idGrupoPedido} = req.query

    db.query('CALL sp_GrupoPedido_ListarProduto(?)',
    [idGrupoPedido], (err, results) => {
      if(err) {
        console.error("Erro ao consultar dados: ", err);
        return res.status(500).send("Erro ao consultar dados");
      }
      res.json(results[0]);
    })
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
