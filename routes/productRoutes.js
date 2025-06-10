const express = require('express');
const router = express.Router();

// Importa um objeto com todas as funções do controller
const productController = require('../controllers/productController');

// Define as rotas e as associa às funções do controller
router.route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

// A linha mais importante: exporta o router configurado
module.exports = router;
