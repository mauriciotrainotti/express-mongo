const mongoose = require('mongoose');

// Definindo o Schema (a estrutura) do Produto
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome do produto é obrigatório.'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, 'O preço do produto é obrigatório.'],
      min: [0, 'O preço não pode ser negativo.'],
    },
    stock: {
        type: Number,
        required: [true, 'A quantidade em estoque é obrigatória.'],
        min: [0, 'O estoque não pode ser negativo.'],
        default: 0
    }
  },
  {
    // Adiciona os campos createdAt e updatedAt automaticamente
    timestamps: true, 
  }
);

// Criando o Model a partir do Schema e exportando
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
