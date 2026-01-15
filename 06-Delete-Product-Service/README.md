# Delete Product Service

Este serviço permite remover um produto usando seu ID.

## Objetivo
Simular a exclusão de dados em uma API backend, sem banco de dados, usando apenas memória.

## Endpoint

DELETE /products/:id

## Exemplo

DELETE http://localhost:3000/products/2

Resposta de sucesso:
```json
{
  "message": "Product deleted successfully"
}
