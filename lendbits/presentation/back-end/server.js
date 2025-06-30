import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import jogosRota from "./routes/jogos.js";
import transacoesRouter from './routes/transacoes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/jogos', jogosRota);
app.use('/api/transacoes', transacoesRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../front-end')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index/homeScreen.html'));
})

const db = new Sequelize('lend_bits', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,  
});

async function connectDB() {
    try {
        await db.authenticate();
        console.log("Conectado ao MySQL!");
    } catch (e) {
        console.log("Erro ao conectar ao MySQL.");
        console.error(e);
    }
}

const server = http.createServer(app);

connectDB().then(() => {
    server.listen(3000, () => console.log("Executando em http://localhost:3000"));
});

export default db;
