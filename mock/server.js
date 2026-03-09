import express from 'express';

const app = express ();
app.use (express.json ());

let users = [];

/**
 * CREATE USER
 */
app.post("/usuarios", (req, res) => {
  const { nome, email, password, administrador } = req.body;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Este email já está sendo usado"
    });
  }

  const newUser = {
    _id: Date.now().toString(),
    nome,
    email,
    password,
    administrador
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Cadastro realizado com sucesso",
    _id: newUser._id
  });
});

/**
 * GET USER
 */
app.get ('/usuarios/:id', (req, res) => {
  const user = users.find (u => u._id === req.params.id);

  if (!user) {
    return res.status (400).json ({
      message: 'Usuário não encontrado',
    });
  }

  res.json (user);
});

/**
 * LIST USER
 */
app.get ('/usuarios', (req, res) => {
  res.json ({
    quantidade: users.length,
    usuarios: users,
  });
});

/**
 * UPDATE USER
 */
app.put ('/usuarios/:id', (req, res) => {
  const index = users.findIndex (u => u._id === req.params.id);

  if (index === -1) {
    return res.status (400).json ({
      message: 'Usuário não encontrado',
    });
  }

  users[index] = {...users[index], ...req.body};

  res.json ({
    message: 'Registro alterado com sucesso',
  });
});

/**
 * DELETE USER
 */
app.delete ('/usuarios/:id', (req, res) => {
  const index = users.findIndex (u => u._id === req.params.id);

  if (index === -1) {
    return res.json ({
      message: 'Nenhum registro excluído',
    });
  }

  users.splice (index, 1);

  res.json ({
    message: 'Registro excluído com sucesso',
  });
});

/**
 * LOGIN
 */
app.post ('/login', (req, res) => {
  const user = users.find (
    u => u.email === req.body.email && u.password === req.body.password
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

export function startMockServer (port = 3001) {
  return new Promise (resolve => {
    const server = app.listen (port, () => {
      console.log (`Mock API running on ${port}`);
      resolve (server);
    });
  });
}
