# Docker

Instruções rápidas para rodar o backend e o Postgres via Docker Compose.

- A raiz do compose está no arquivo `docker-compose.yml`.
- O serviço `backend` usa as variáveis definidas em `backend/.env.docker`.

### Comandos

## Detalhes

A raiz do compose está no arquivo `docker-compose.yml`.

O serviço `backend` usa as variáveis definidas em `backend/.env.docker`.

## Comandos

```ps1
# construir e subir containers
docker compose up --build

# subir em background
docker compose up -d --build

# parar e remover containers
docker compose down
```

### Observações

- O `DB_HOST` em `backend/.env.docker` foi definido para `db` (nome do serviço postgres no compose).
- Se quiser conectar externamente ao banco (fora do compose), continue usando `DB_HOST=localhost` e a porta 5432.

## Observações

O `DB_HOST` em `backend/.env.docker` foi definido para `db` (nome do serviço postgres no compose).

Se quiser conectar externamente ao banco (fora do compose), continue usando `DB_HOST=localhost` e a porta 5432.
