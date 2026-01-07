import express from "express";

const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Keyboard Redragon", price: 299.9 },
  { id: 2, name: "Mouse Logitech G203", price: 159.9 },
  { id: 3, name: "Headset HyperX Cloud", price: 499.9 }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Product removed successfully" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
