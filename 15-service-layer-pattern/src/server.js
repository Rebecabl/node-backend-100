import express from "express";

const app = express();

function serviceMessage() {
  return "Mensagem da camada de serviço";
}

app.get("/", (req, res) => {
  res.json({ message: serviceMessage() });
});

app.listen(3000);
