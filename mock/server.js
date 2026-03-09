import express from 'express';

import usersRoutes from './routes/users.routes.js';
import productsRoutes from './routes/products.routes.js';

import {resetDb} from './db/memory.js';

const app = express ();

app.use (express.json ());

/**
 * ROUTES
 */
app.use ('/usuarios', usersRoutes);
app.use ('/produtos', productsRoutes);

/**
 * LOGIN
 */
import {db} from './db/memory.js';

app.post ('/login', (req, res) => {
  const {email, password} = req.body;

  const user = db.users.find (
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status (401).json ({
      message: 'Email e/ou senha inválidos',
    });
  }

  res.json ({
    message: 'Login realizado com sucesso',
    authorization: 'Bearer fake.header.signature',
  });
});

/**
 * RESET MOCK (muito útil para testes)
 */
app.post ('/__reset', (req, res) => {
  resetDb ();

  res.json ({
    message: 'Mock resetado',
  });
});

export function startMockServer (port = 3001) {
  return new Promise (resolve => {
    const server = app.listen (port, () => {
      console.log (`Mock API running on ${port}`);
      resolve (server);
    });
  });
}
