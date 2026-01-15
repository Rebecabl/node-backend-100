import express from "express";

const app = express();

app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toISOString();

  console.log(`[${date}] ${method} ${url}`);

  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Mouse", price: 100 },
    { id: 2, name: "Teclado", price: 200 }
  ]);
});

app.listen(3000);
