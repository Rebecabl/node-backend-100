import express from "express";

const app = express();
app.use(express.json());

const products = [];

for (let i = 1; i <= 20; i++) {
  products.push({
    id: i,
    name: `Produto ${i}`,
    price: i * 10
  });
}

app.get("/products", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const items = products.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalItems: products.length,
    totalPages: Math.ceil(products.length / limit),
    items
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
