// Arquivo: index.js (O único ponto de entrada da aplicação)

// --- Importações de Módulos ---
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// --- Configuração Inicial ---
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config(); 
// Importa e executa a função de conexão com o banco de dados
const connectDB = require('./database/connection');
connectDB();

// --- Importação das Rotas ---
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRoutes = require('./routes/productRoutes');

// --- Inicialização do Express ---
const app = express();

// --- Configuração dos Middlewares ---
app.use(logger('dev')); // Logger de requisições
app.use(cors()); // Habilita o CORS
app.use(express.json()); // Habilita o parsing de JSON
app.use(express.urlencoded({ extended: false })); // Habilita o parsing de dados de formulário
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos

// --- Definição das Rotas da API ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productRoutes);

// --- Manipuladores de Erro (Handlers) ---
// Captura 404 e envia uma resposta JSON
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint não encontrado.' });
});

// Manipulador de erro principal. Captura qualquer outro erro.
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    // Em desenvolvimento, mostra o stack do erro para facilitar o debug
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});


// --- Inicialização do Servidor ---
// A parte mais importante: o servidor só é iniciado AQUI.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
