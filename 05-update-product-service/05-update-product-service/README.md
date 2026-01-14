# Projeto 05 — Update Product Service

API simples em Node.js para **atualizar produtos em memória** usando Express.

## 🚀 Funcionalidades
- Atualizar produto por ID
- Validação básica de dados
- Retorno de erros apropriados
- Health check

## 📌 Endpoint

### Atualizar produto
PUT `/products/:id`

#### Body (JSON)
```json
{
  "name": "Mouse Gamer",
  "price": 180
}
