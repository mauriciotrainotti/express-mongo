// Crie uma pasta chamada 'database' na raiz do seu projeto.
// Dentro dessa pasta, crie este arquivo com o nome 'connection.js'.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URI do seu arquivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Opções para evitar avisos de depreciação (algumas podem não ser necessárias nas versões mais recentes do mongoose)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Conectado com sucesso: ${conn.connection.host}`);
  } catch (error) {
    // Em caso de erro na conexão, exibe o erro e encerra o processo
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Encerra a aplicação com código de falha
  }
};

module.exports = connectDB;
