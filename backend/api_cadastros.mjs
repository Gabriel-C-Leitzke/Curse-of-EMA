import { createConnection } from "mysql2";
import dotenv from "dotenv";
import pkg from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
const { json } = pkg;
const port = 3000;
dotenv.config();

const connection = createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
})

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no banco de dados");
    } else {
        console.log("Você conseguiu conectar no banco de dados");
    }
})

app.use (
    cors({
        origin: ["http://192.168.100.129:5500", "http://127.0.0.1:5500", "http://127.0.0.1:5501"], //permitir apenas este domínio
    })
);

//middleware
app.use(json())

//criar um novo cadastro

app.post("/novo-cadastro", (req, res) => {
    const {nome, cpf, email, idade, senha} = req.body;
    const novo_cadastro = {nome, cpf, email, idade, senha};
    connection.query("insert into cadastros set ?", novo_cadastro, (err, result) => {
        if (err) {
            console.log("Deu erro para tentar cadastrar um novo cadastro");
        } else {
            res.json(result);
        }
    });
});

//deleta um cadastro

app.delete("/deletar-cadastro/:id", (req, res) => {
    const id = req.params.id;
    connection.query("delete from cadastros where id = ?", id, (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar deletar seu cadastros");
        } else {
            res.json(result);
        }
    })
})

// consulta os cadastros

app.get("/consultar-cadastro", (req, res) => {
    connection.query("select * from cadastros", (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar consultar seus cadastros");
        } else {
            res.json(result);
        }
    })
})

//alterar um cadastro
app.put("/editar-cadastro", (req, res) => {
    const {id} = req.body;
    const {nome, cpf, email, idade, senha} = req.body;
    const cadastros = {nome, cpf, email, idade, senha};
    connection.query ("update cadastros set ? where id = ?", [cadastros, id], (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar editar seu cadastros");
        } else {
            res.json(result);
        }
    })
})

app.listen(port, () => {
    console.log(`A sua API está funcionando na porta ${port}`);
  });