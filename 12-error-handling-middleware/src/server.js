import express from "express";

const app = express();

app.get("/test", () => {
  throw new Error("Erro de teste");
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000);
