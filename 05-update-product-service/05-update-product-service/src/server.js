import express from "express";

const app = express();
app.use(express.json());

// Produtos em memória
let products = [
  { id: 1, name: "Mouse", price: 120 },
  { id: 2, name: "Teclado", price: 200 }
];

// Atualizar produto
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      error: "Dados inválidos"
    });
  }

  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      error: "Produto não encontrado"
    });
  }

  products[productIndex] = {
    id,
    name,
    price
  };

  res.json({
    message: "Produto atualizado com sucesso",
    product: products[productIndex]
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
