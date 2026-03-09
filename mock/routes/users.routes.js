import {Router} from 'express';
import {db} from '../db/memory.js';

const router = Router ();

/**
 * CREATE USER
 */
router.post ('/', (req, res) => {
  const {nome, email, password, administrador} = req.body;

  const existingUser = db.users.find (u => u.email === email);

  if (existingUser) {
    return res.status (400).json ({
      message: 'Este email já está sendo usado',
    });
  }

  const newUser = {
    _id: Date.now ().toString (),
    nome,
    email,
    password,
    administrador,
  };

  db.users.push (newUser);

  res.status (201).json ({
    message: 'Cadastro realizado com sucesso',
    _id: newUser._id,
  });
});

/**
 * LIST USERS
 */
router.get ('/', (req, res) => {
  res.json ({
    quantidade: db.users.length,
    usuarios: db.users,
  });
});

/**
 * GET USER
 */
router.get ('/:id', (req, res) => {
  const user = db.users.find (u => u._id === req.params.id);

  if (!user) {
    return res.status (400).json ({
      message: 'Usuário não encontrado',
    });
  }

  res.json (user);
});

/**
 * UPDATE USER
 */
router.put ('/:id', (req, res) => {
  const index = db.users.findIndex (u => u._id === req.params.id);

  if (index === -1) {
    return res.status (400).json ({
      message: 'Usuário não encontrado',
    });
  }

  db.users[index] = {...db.users[index], ...req.body};

  res.json ({
    message: 'Registro alterado com sucesso',
  });
});

/**
 * DELETE USER
 */
router.delete ('/:id', (req, res) => {
  const index = db.users.findIndex (u => u._id === req.params.id);

  if (index === -1) {
    return res.status (200).json ({
      message: 'Nenhum registro excluído',
    });
  }

  db.users.splice (index, 1);

  res.json ({
    message: 'Registro excluído com sucesso',
  });
});

export default router;
