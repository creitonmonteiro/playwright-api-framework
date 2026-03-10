import {Router} from 'express';
import {db} from '../db/memory.js';

const router = Router ();

/**
 * CREATE PRODUCT
 */
router.post('/produtos', (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: 'Body da requisição é obrigatório'
    });
  }

  const { nome, preco, descricao, quantidade } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({
      message: 'Campos obrigatórios não enviados'
    });
  }

  const newProduct = {
    _id: Date.now().toString(),
    nome,
    preco,
    descricao,
    quantidade
  };

  products.push(newProduct);

  return res.status(201).json({
    message: 'Cadastro realizado com sucesso',
    _id: newProduct._id
  });

});

/**
 * LIST PRODUCTS
 */
router.get ('/', (req, res) => {
  res.json ({
    quantidade: db.products.length,
    produtos: db.products,
  });
});

/**
 * GET PRODUCT
 */
router.get ('/:id', (req, res) => {
  const products = db.products.find (u => u._id === req.params.id);

  if (!products) {
    return res.status (400).json ({
      message: 'Produto não encontrado',
    });
  }

  res.json (products);
});

export default router;
