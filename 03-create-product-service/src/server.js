import express from "express";

const app = express();
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Mouse Logitech MX Master 3",
    price: 499.9,
    category: "Periféricos"
  }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.listen(3000);
