import express from "express";
import { randomUUID } from "crypto";

const app = express();

app.get("/uuid", (req, res) => {
  res.json({ id: randomUUID() });
});

app.listen(3000);
