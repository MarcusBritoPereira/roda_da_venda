# Dockerfile para Next.js 15/16 (Desenvolvimento)
FROM node:20-alpine

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do Next.js
EXPOSE 3000

# Rodar em modo dev
CMD ["npm", "run", "dev"]
