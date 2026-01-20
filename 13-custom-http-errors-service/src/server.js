import express from "express";

const app = express();

app.get("/404", (req, res) => {
  res.status(404).json({ error: "Não encontrado" });
});

app.get("/401", (req, res) => {
  res.status(401).json({ error: "Não autorizado" });
});

app.listen(3000);
