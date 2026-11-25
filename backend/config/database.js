const mongoose = require('mongoose');

async function conectarBanco() {
    try {
        console.log('Tentando conectar ao MongoDB...');

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('MongoDB conectado com sucesso!');

    } catch (erro) {
        console.log('Erro ao conectar com MongoDB:');
        console.log(erro.message);
        process.exit(1);
    }
}

module.exports = conectarBanco;