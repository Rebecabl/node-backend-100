import express from "express";

const app = express();

const products = [
  {
    id: 1,
    name: "Mouse Logitech MX Master 3",
    price: 499.9,
    category: "Periféricos"
  },
  {
    id: 2,
    name: "Teclado Mecânico Keychron K6",
    price: 689.0,
    category: "Periféricos"
  },
  {
    id: 3,
    name: "Monitor LG UltraWide 29\"",
    price: 1299.0,
    category: "Monitores"
  }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(3000);
