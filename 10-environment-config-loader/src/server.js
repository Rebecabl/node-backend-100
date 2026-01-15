import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;
const NODE_ENV = process.env.NODE_ENV;

if (!PORT || !APP_NAME || !NODE_ENV) {
  console.error("Erro: variáveis de ambiente obrigatórias não definidas");
  process.exit(1);
}

app.get("/health", (req, res) => {
  res.json({
    app: APP_NAME,
    environment: NODE_ENV,
    status: "ok"
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} rodando na porta ${PORT}`);
  console.log(`Ambiente: ${NODE_ENV}`);
});
