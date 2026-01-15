# Day 09 — Request Time Tracker

Este projeto faz parte do repositório **Node | Backend | 100 Projects**.

O objetivo é criar um middleware que mede o tempo de processamento de cada
requisição HTTP feita ao servidor.

---

## Objetivo

Registrar no terminal:
- método HTTP
- rota acessada
- tempo total de resposta da requisição (em milissegundos)

Esse tipo de controle é essencial para entender a performance de uma API.

---

## Conceito Principal

O middleware:
1. Marca o tempo quando a requisição chega
2. Aguarda a resposta finalizar
3. Calcula a diferença de tempo
4. Exibe o resultado no terminal

---

