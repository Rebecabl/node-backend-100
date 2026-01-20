import express from "express";

const app = express();

app.get("/date", (req, res) => {
  const now = new Date();

  res.json({
    iso: now.toISOString(),
    br: now.toLocaleString("pt-BR")
  });
});

app.listen(3000);
