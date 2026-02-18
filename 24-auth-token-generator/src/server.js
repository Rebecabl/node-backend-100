import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const SECRET = 'super_secret_key';

app.post('/token', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId obrigatório' });
  }

  const token = jwt.sign({ userId }, SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.post('/verify', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token obrigatório' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ valid: true, decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
