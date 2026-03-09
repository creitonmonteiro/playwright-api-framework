import {Router} from 'express';
import {db} from '../db/memory.js';

const router = Router ();

/**
 * CREATE PRODUCT
 */
router.post ('/', (req, res) => {
  const {nome, preco, descricao, quantidade} = req.body;

  const existingProduct = db.products.find (p => p.nome === nome);

  if (existingProduct) {
    return res.status (400).json ({
      message: 'Já existe produto com esse nome',
    });
  }

  const newProduct = {
    _id: Date.now ().toString (),
    nome,
    preco,
    descricao,
    quantidade,
  };

  db.products.push (newProduct);

  res.status (201).json ({
    message: 'Cadastro realizado com sucesso',
    _id: newProduct._id,
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

export default router;
