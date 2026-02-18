import express from 'express';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

app.post('/hash', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Senha obrigatória' });
  }

  const hash = await bcrypt.hash(password, 10);

  res.json({ hash });
});

app.post('/compare', async (req, res) => {
  const { password, hash } = req.body;

  if (!password || !hash) {
    return res.status(400).json({ error: 'Password e hash obrigatórios' });
  }

  const match = await bcrypt.compare(password, hash);

  res.json({ match });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
