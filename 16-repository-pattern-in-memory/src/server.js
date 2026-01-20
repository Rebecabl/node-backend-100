import express from "express";

const app = express();

const productRepository = [
  { id: 1, name: "Produto A" },
  { id: 2, name: "Produto B" }
];

app.get("/products", (req, res) => {
  res.json(productRepository);
});

app.listen(3000);
