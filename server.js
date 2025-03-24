import express from "express";
import cors from "cors";
import db from "./config/database.js";
import jogosRota from "./routes/jogos.js";
import http from "http";

const app = express()
app.use(express.json())
app.use(cors())

try {
    await db.authenticate()
    console.log("Conectado ao MySQL!");
} catch(e) {
    console.log("Erro ao conectar ao MySQL.");
}

const server = http.createServer(app);
app.use("/", jogosRota);
server.listen(5000, ()=> console.log("Executando em http://localhost:5000"));
