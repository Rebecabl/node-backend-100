import express from "express";

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`
    );
  });

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


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
