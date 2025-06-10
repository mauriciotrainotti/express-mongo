// Este script serve apenas para testar a conexão com o MongoDB,
// ignorando todo o resto da aplicação.

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env
dotenv.config();

const testDBConnection = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('ERRO: A variável MONGO_URI não foi encontrada no arquivo .env.');
    return;
  }

  console.log('Tentando conectar ao MongoDB Atlas...');
  console.log('URI:', mongoURI); // Vamos mostrar a URI para garantir que está sendo lida

  try {
    // Tenta conectar usando a URI do seu arquivo .env
    await mongoose.connect(mongoURI);

    // Se chegou até aqui, a conexão foi um sucesso!
    console.log('\n*************************************');
    console.log('CONEXÃO BEM-SUCEDIDA!');
    console.log('*************************************');

  } catch (error) {
    // Se a conexão falhar, o erro será capturado aqui.
    console.error('\n*************************************');
    console.error('A CONEXÃO FALHOU. Causa do erro:');
    console.error(error.message); // Mostra a mensagem de erro específica
    console.error('*************************************');
    
  } finally {
    // Desconecta do banco de dados após o teste
    await mongoose.disconnect();
    console.log('\nDesconectado do banco de dados.');
  }
};

// Executa a função de teste
testDBConnection();
