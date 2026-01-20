import express from "express";

const app = express();

app.get("/product", (req, res) => {
  const product = {
    id: 1,
    name: "Mouse",
    price: 100,
    internalCode: "INT123"
  };

  res.json({
    id: product.id,
    name: product.name,
    price: product.price
  });
});

app.listen(3000);
