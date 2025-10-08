FROM node:24-alpine AS builder
WORKDIR /app

# Instala pnpm para usar o pnpm-lock.yaml do projeto
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@8.9.0
RUN pnpm install --frozen-lockfile

# Copia o restante do código e build
COPY . .
RUN pnpm run build

# Instala dependências de produção (gera node_modules reduzido)
RUN pnpm install --prod --frozen-lockfile

FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copia artefatos do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/main"]
