import express from "express";

const app = express();
app.use(express.json());

app.post("/sanitize", (req, res) => {
  const name = req.body.name?.trim();

  res.json({ name });
});

app.listen(3000);
