import express from "express";

const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Keyboard", price: 150 },
  { id: 2, name: "Mouse", price: 80 },
  { id: 3, name: "Monitor", price: 900 }
];

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Product deleted successfully" });
});

app.listen(3000);
