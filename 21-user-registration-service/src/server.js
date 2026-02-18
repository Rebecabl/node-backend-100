import express from 'express';

const app = express();
app.use(express.json());

let users = [];
let id = 1;

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Dados obrigatórios' });
  }

  const user = {
    id: id++,
    name,
    email,
    password,
  };

  users.push(user);

  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
