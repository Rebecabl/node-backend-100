import express from 'express';

const app = express();
app.use(express.json());

let users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@email.com',
    password: '123',
  },
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Senha inválida' });
  }

  res.json({ message: 'Login realizado', user });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
