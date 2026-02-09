# Etapa 1: Construcción
FROM node:18-alpine AS build
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine

# Copiamos los archivos construidos de Vite (carpeta dist) a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos una configuración de Nginx para que el Router de React funcione
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]