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

//criar um novo curso

app.post("/novo-curso", (req, res) => {
    const {nome, turno, descricao} = req.body;
    const novo_curso = {nome, turno, descricao};
    connection.query("insert into cursos set ?", novo_curso, (err, result) => {
        if (err) {
            console.log("Deu erro para tentar cadastrar um novo curso");
        } else {
            res.json(result);
        }
    });
});

//deleta um curso

app.delete("/deletar-curso/:id", (req, res) => {
    const id = req.params.id;
    connection.query("delete from cursos where id = ?", id, (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar deletar seu curso");
        } else {
            res.json(result);
        }
    })
})

// consulta os cursos

app.get("/consultar-curso", (req, res) => {
    connection.query("select * from cursos", (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar consultar seus cursos");
        } else {
            res.json(result);
        }
    })
})

//alterar um curso
app.put("/editar-curso", (req, res) => {
    const {id} = req.body;
    const {nome, turno, descricao} = req.body;
    const cursos = {nome, turno, descricao};
    connection.query ("update cursos set ? where id = ?", [cursos, id], (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar editar seu curso");
        } else {
            res.json(result);
        }
    })
})

app.listen(port, () => {
    console.log(`A sua API está funcionando na porta ${port}`);
  });