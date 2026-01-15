# Day 08 — Simple Logger Middleware

Este projeto faz parte do repositório **Node | Backend | 100 Projects** e tem como objetivo introduzir o conceito de **middleware** no Express.

O foco aqui não é criar uma API complexa, mas entender como o backend pode **interceptar e observar requisições HTTP** antes que elas cheguem às rotas finais.

---

## Objetivo do Projeto

Criar um **middleware simples de log**, capaz de registrar no terminal informações básicas de cada requisição feita à aplicação, como:

- Método HTTP (GET, POST, PUT, DELETE)
- Rota acessada
- Data e hora da requisição

Esse tipo de funcionalidade é muito comum em aplicações reais para:
- Debug
- Monitoramento simples
- Auditoria
- Análise de tráfego

---

## O que é um Middleware (explicação para iniciantes)

Um middleware é uma função que:
- recebe a requisição (`req`)
- recebe a resposta (`res`)
- decide se a requisição continua ou não

Ele roda **antes das rotas** e pode:
- ler dados da requisição
- modificar dados
- bloquear a requisição
- ou simplesmente registrar informações e seguir o fluxo

No Express, middlewares são registrados com `app.use()`.

---

## Estrutura do Projeto

