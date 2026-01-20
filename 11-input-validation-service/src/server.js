import express from "express";

const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "name e email são obrigatórios"
    });
  }

  res.status(201).json({ name, email });
});

app.listen(3000);
