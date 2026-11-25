
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/database');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

const app = express();''

app.use(cors());
app.use(express.json());

app.use('/api/movimentacoes', movimentacaoRoutes);

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    await conectarBanco();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

iniciarServidor();
