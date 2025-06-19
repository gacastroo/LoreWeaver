# 🌍 Imagen base
FROM node:18-slim

# 🔹 Instalar OpenSSL (para que Prisma no de warning)
RUN apt-get update -y && apt-get install -y openssl

# 🔹 Crear directorio de trabajo
WORKDIR /app

# 🔹 Copiar package.json y package-lock.json
COPY package*.json ./

# 🔹 Copiar Prisma schema ANTES (para que npm install no falle)
COPY prisma ./prisma

# 🔹 Instalar dependencias
RUN npm install

# 🔹 Copiar todo el código del backend
COPY . .

# 🔹 Generar Prisma client
RUN npx prisma generate

# 🌍 Exponer puerto
EXPOSE 3000

# 🔹 Comando para arrancar el backend
CMD ["npm", "start"]
